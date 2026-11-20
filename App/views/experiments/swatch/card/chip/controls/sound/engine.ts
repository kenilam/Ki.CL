// Helpers
import { SILENT, chainOf } from './chain';
import { chordOf, melodyOf, type Tone as Settings } from './scale';
import { voicesOf } from './voices';

// Constants
import { TONE_LEVEL } from '@/views/experiments/swatch/constants';

const FADE_SECONDS = 1.5;

const createEngine = async (tone: Settings) => {
  const Tone = await import('tone');

  await Tone.start();

  const { delay, filter, nodes, output, sweep } = chainOf(Tone, tone);
  const { bed, breath, melody } = voicesOf(Tone, tone.timbre);
  const air = new Tone.Noise({
    type: 'pink',
    volume: breath ? -34 : -Infinity,
  }).connect(filter);
  const toFrequency = (midi: number) =>
    Tone.Frequency(midi, 'midi').toFrequency();
  let step = 0;

  bed.set({ volume: -14 }).connect(filter);
  melody.set({ volume: -16 }).connect(delay);

  const chords = new Tone.Loop(
    (time) => {
      bed.releaseAll(time);
      bed.triggerAttack(chordOf(tone, step).map(toFrequency), time + 0.1, 0.5);
      step += 1;
    },
    14 - tone.movement * 8
  );

  const notes = new Tone.Loop(
    (time) => {
      if (Math.random() > 0.25 + tone.density * 0.6) {
        return;
      }

      melody.triggerAttackRelease(
        toFrequency(melodyOf(tone)),
        3,
        time,
        0.2 + Math.random() * 0.3
      );
    },
    2.5 - tone.density * 1.5
  );

  const transport = Tone.getTransport();

  sweep.start();
  air.start();
  chords.start();
  notes.start('+1');
  transport.start();
  output.volume.rampTo(TONE_LEVEL, 3);

  const stop = () => {
    output.volume.rampTo(SILENT, FADE_SECONDS);

    // The transport is shared, so it keeps running for the next tone.
    window.setTimeout(() => {
      [chords, notes, air, bed, melody, ...nodes].forEach((node) => {
        node.dispose();
      });
    }, FADE_SECONDS * 1000);
  };

  return { stop };
};

type Engine = Awaited<ReturnType<typeof createEngine>>;

export { createEngine, type Engine };
