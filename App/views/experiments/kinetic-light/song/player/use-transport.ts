import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Libraries
import * as Tone from 'tone';

// Readers
import {
  toArrangedBeat,
  type Arrangement,
} from '@/views/experiments/kinetic-light/read/arrangement';
import {
  toBeat,
  type Style,
} from '@/views/experiments/kinetic-light/read/beat';
import {
  lengthOf,
  type Note,
  type Piece,
} from '@/views/experiments/kinetic-light/read/piece';

// Song
import { LEAD_SECONDS } from '@/views/experiments/kinetic-light/song/clock';

// Constants
import {
  END_HOLD_SECONDS,
  PAUSE_EASE_SECONDS,
  REPLAY_LEAD_SECONDS,
} from '@/views/experiments/kinetic-light/constants';

// Sounds
import {
  ARRANGED,
  INSTRUMENTS,
  KITS,
  STYLES,
  SUSTAIN,
  SUSTAIN_FROM_SECONDS,
  SYNTH,
  VOICES,
  type Instrument,
} from './sounds';

type Status = 'ended' | 'idle' | 'loading' | 'paused' | 'playing';

type Voice = keyof typeof VOICES;

type Beat = 'none' | Style;

type Keys = Tone.Sampler | Tone.PolySynth<Tone.FMSynth>;

type Sound = {
  delay: Tone.PingPongDelay;
  drums: Partial<Record<Style, Tone.Sampler>>;
  instruments: Partial<Record<Instrument, Keys>>;
  ceiling: Tone.WaveShaper;
  output: Tone.Gain;
  reverb: Tone.Reverb;
  shelf: Tone.Filter;
  sustain: Tone.PolySynth<Tone.Synth>;
};

type Transport = {
  beat: Beat;
  error: boolean;
  pause: () => void;
  play: () => Promise<void>;
  status: Status;
  voice: Voice;
};

const RAMP_SECONDS = 0.05;
const ASK_AFTER_SECONDS = 1;
const LOOP_MARGIN_SECONDS = 0.05;
const SHELF_HZ = 1000;
const DELAY_BEATS = 0.75;
const DELAY_FEEDBACK = 0.35;
const REVERB_SECONDS = 4;
const CEILING = 10 ** (-1 / 20);
const KNEE = 10 ** (-3 / 20);
const HEADROOM = 2;
const CURVE_LENGTH = 4096;

const soften = (input: number): number => {
  const level = Math.abs(input * HEADROOM);

  if (level <= KNEE) {
    return input * HEADROOM;
  }

  const over = Math.tanh((level - KNEE) / (CEILING - KNEE));

  return Math.sign(input) * (KNEE + (CEILING - KNEE) * over);
};

const ready = (keys: Keys): boolean =>
  keys instanceof Tone.Sampler ? keys.loaded : true;

const parts = ({ drums, instruments, sustain }: Sound) => [
  ...Object.values(drums),
  ...Object.values(instruments),
  sustain,
];

function useTransport(
  piece: Piece,
  arrangement?: Arrangement | null
): Transport {
  const sound = useRef<Sound | null>(null);
  const replaying = useRef(false);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState(false);
  const voice = ARRANGED.voice[arrangement?.voice ?? 'GRAND'];
  const voiced = useRef<Voice>(voice);
  const beat = ARRANGED.beat[arrangement?.beat ?? 'KIT'];
  const beating = useRef<Beat>(beat);
  const [source, setSource] = useState(piece);

  if (source !== piece) {
    setSource(piece);
    setStatus('idle');
    setError(false);
  }

  const length = useMemo(() => lengthOf(piece), [piece]);
  const sections = arrangement?.sections;
  const steps = arrangement?.steps ?? 0;
  const hits = useMemo(() => {
    const toHits = (style: Style): Note[] => {
      if (piece.drums?.length) {
        return piece.drums;
      }

      return sections?.length
        ? toArrangedBeat(piece, { sections, steps }, length, style)
        : toBeat(piece, length, style);
    };

    return Object.fromEntries(
      STYLES.map((style) => [style, toHits(style)])
    ) as Record<Style, Note[]>;
  }, [length, piece, sections, steps]);

  const keysOf = useCallback((instrument: Instrument): Keys | null => {
    const current = sound.current;

    if (!current) {
      return null;
    }

    const known = current.instruments[instrument];

    if (known) {
      return known;
    }

    const created =
      instrument === 'synth'
        ? new Tone.PolySynth(Tone.FMSynth, SYNTH)
        : new Tone.Sampler(INSTRUMENTS[instrument]);

    created.connect(current.shelf);
    current.instruments[instrument] = created;

    return created;
  }, []);

  const kitOf = useCallback((style: Style): Tone.Sampler | null => {
    const current = sound.current;

    if (!current) {
      return null;
    }

    const known = current.drums[style];

    if (known) {
      return known;
    }

    const created = new Tone.Sampler(KITS[style]).connect(current.output);

    current.drums[style] = created;

    return created;
  }, []);

  const load = useCallback(async () => {
    const settings = VOICES[voiced.current];
    const delayTime = (60 / piece.tempo) * DELAY_BEATS;
    const ceiling = new Tone.WaveShaper(soften, CURVE_LENGTH).toDestination();
    const output = new Tone.Gain(1 / HEADROOM).connect(ceiling);
    const reverb = new Tone.Reverb({
      decay: REVERB_SECONDS,
      wet: settings.reverb,
    }).connect(output);
    const delay = new Tone.PingPongDelay({
      delayTime,
      feedback: DELAY_FEEDBACK,
      maxDelay: delayTime,
      wet: settings.delay,
    }).connect(reverb);
    const shelf = new Tone.Filter({
      frequency: SHELF_HZ,
      gain: settings.brightness,
      type: 'highshelf',
    }).connect(delay);

    ceiling.oversample = '4x';
    sound.current = {
      ceiling,
      delay,
      drums: {},
      instruments: {},
      output,
      reverb,
      shelf,
      sustain: new Tone.PolySynth(Tone.Synth, SUSTAIN).connect(output),
    };

    const keys = keysOf(settings.instrument);

    if (keys) {
      keys.volume.value = settings.volume;
    }

    if (beating.current !== 'none') {
      kitOf(beating.current);
    }

    await Promise.all([Tone.loaded(), reverb.ready]);

    const transport = Tone.getTransport();

    transport.stop();
    transport.cancel();
    piece.notes.forEach(({ duration, pitch, time, velocity }) => {
      transport.schedule((at) => {
        const voicing = VOICES[voiced.current];
        const playing = sound.current?.instruments[voicing.instrument];

        if (!playing || !ready(playing)) {
          return;
        }

        const note = Tone.Frequency(pitch, 'midi');

        voicing.layers.forEach(({ gain, interval }) => {
          playing.triggerAttackRelease(
            note.transpose(interval).toFrequency(),
            duration,
            at,
            velocity * gain
          );
        });

        if (duration >= SUSTAIN_FROM_SECONDS) {
          sound.current?.sustain.triggerAttackRelease(
            note.toFrequency(),
            duration,
            at,
            velocity
          );
        }
      }, time + LEAD_SECONDS);
    });
    STYLES.forEach((style) => {
      hits[style].forEach(({ pitch, time, velocity }) => {
        transport.schedule((at) => {
          const kit = sound.current?.drums[style];

          if (beating.current !== style || !kit?.loaded) {
            return;
          }

          kit.triggerAttack(
            Tone.Frequency(pitch, 'midi').toFrequency(),
            at,
            velocity
          );
        }, time + LEAD_SECONDS);
      });
    });
    transport.loop = true;
    transport.loopStart = LEAD_SECONDS - REPLAY_LEAD_SECONDS;
    transport.loopEnd = LEAD_SECONDS + length + END_HOLD_SECONDS;
    transport.schedule(
      (time) => {
        Tone.getDraw().schedule(() => setStatus('ended'), time);
      },
      LEAD_SECONDS + length + ASK_AFTER_SECONDS
    );
    transport.schedule(
      (time) => {
        if (!replaying.current) {
          transport.pause(time);
        }
      },
      transport.loopEnd - LOOP_MARGIN_SECONDS - PAUSE_EASE_SECONDS
    );
    transport.schedule(() => {
      replaying.current = false;
    }, LEAD_SECONDS);
  }, [hits, keysOf, kitOf, length, piece]);

  const play = useCallback(async () => {
    setError(false);

    try {
      await Tone.start();

      if (!sound.current) {
        setStatus('loading');
        await load();
      }

      const transport = Tone.getTransport();

      replaying.current = transport.seconds >= LEAD_SECONDS + length;

      if (transport.state !== 'started') {
        transport.start();
      }

      setStatus('playing');
    } catch {
      setError(true);
      setStatus('idle');
    }
  }, [length, load]);

  const pause = useCallback(() => {
    Tone.getTransport().pause();

    if (sound.current) {
      parts(sound.current).forEach((part) => part?.releaseAll());
    }

    setStatus('paused');
  }, []);

  useEffect(() => {
    beating.current = beat;

    if (beat !== 'none') {
      kitOf(beat);
    }
  }, [beat, kitOf]);

  useEffect(() => {
    voiced.current = voice;

    if (!sound.current) {
      return;
    }

    const settings = VOICES[voice];

    keysOf(settings.instrument)?.volume.rampTo(settings.volume, RAMP_SECONDS);
    sound.current.shelf.gain.rampTo(settings.brightness, RAMP_SECONDS);
    sound.current.delay.wet.rampTo(settings.delay, RAMP_SECONDS);
    sound.current.reverb.wet.rampTo(settings.reverb, RAMP_SECONDS);
  }, [keysOf, voice]);

  useEffect(
    () => () => {
      const transport = Tone.getTransport();

      transport.stop();
      transport.cancel();
      transport.loop = false;

      if (sound.current) {
        parts(sound.current).forEach((part) => part?.dispose());
        sound.current.shelf.dispose();
        sound.current.delay.dispose();
        sound.current.reverb.dispose();
        sound.current.output.dispose();
        sound.current.ceiling.dispose();
      }

      sound.current = null;
    },
    [load]
  );

  return {
    beat,
    error,
    pause,
    play,
    status,
    voice,
  };
}

export { useTransport, type Beat, type Status, type Transport, type Voice };
