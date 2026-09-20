import { clip } from 'scribbletune';
import { Key, Note, Scale, Voicing } from 'tonal';

import type { VibeFamily } from '@/Views/Experiments/MusicVisualiser/Spec';

import { createRandom, pick } from './random';

/*
 * The composer. Pure: a seed and a style in, a piece out, and the piece
 * hands back the events of any bar on request. Nothing here touches audio.
 *
 * The harmony comes from tonal: the seventh chords of the key, a
 * progression chosen by degree, and voicings that lead from one chord to
 * the next with the least movement. The rhythm comes from scribbletune's
 * pattern strings, where `x` is a hit, `-` a rest, `_` a tie and `[xx]` a
 * subdivision, so a bar of comping or melody is a short readable string.
 * The notes between them are this file's own: a walk through the mode's
 * pentatonic that leans on chord tones where the ear expects them.
 *
 * Form is sixteen bars: eight on one progression, eight on another, with
 * the second half busier. That is what gives a piece sections for the
 * director to notice.
 */

export type Mode = 'major' | 'minor';

export type Voice = 'bass' | 'hat' | 'keys' | 'kick' | 'pad' | 'rim';

/** One sound. `at` and `duration` are in beats from the bar's start. */
export type Event = {
  at: number;
  duration: number;
  midi: number;
  velocity: number;
  voice: Voice;
};

export type Piece = {
  /** Events of bar `index`, from zero. Deterministic for a given index. */
  bar(index: number): Event[];
  chords: string[];
  mode: Mode;
  tempo: number;
  tonic: string;
};

/** Bars per section, and sections per form before it repeats. */
const SECTION_BARS = 8;

/** scribbletune's tick: 128 per quarter note. */
const TICKS_PER_BEAT = 128;

const TONICS = ['A', 'Bb', 'C', 'D', 'Eb', 'F', 'G'];

const TEMPO: Record<VibeFamily, number> = {
  ambient: 56,
  lofi: 84,
  piano: 68,
};

/** Odd eighths pushed late, in beats, for the stations that swing. */
const SWING: Record<VibeFamily, number> = {
  ambient: 0,
  lofi: 0.09,
  piano: 0.03,
};

/**
 * Progressions as scale degrees, one to seven, over the key's seventh
 * chords. Two are drawn per piece, one per section, always different.
 */
const PROGRESSIONS: Record<Mode, number[][]> = {
  major: [
    [1, 6, 4, 5],
    [1, 3, 6, 4],
    [2, 5, 1, 6],
    [4, 5, 3, 6],
    [1, 4, 6, 5],
    [6, 4, 1, 5],
  ],
  minor: [
    [1, 6, 3, 7],
    [1, 4, 6, 5],
    [2, 5, 1, 1],
    [6, 7, 1, 1],
    [1, 7, 6, 7],
    [4, 1, 6, 5],
  ],
};

/** Where the keys sit when comping, and the pad when it holds. */
const KEYS_RANGE = ['G2', 'G4'];
const PAD_RANGE = ['C3', 'C5'];

type Patterns = { A: string[]; B: string[] };

/**
 * Comping rhythms, eight eighths to the bar. Ties (`_`) hold a chord to
 * the next hit, so the piano's chords sustain the way a pedal would keep
 * them; lo-fi stabs stay short and leave air between them.
 */
const COMP: Record<VibeFamily, Patterns> = {
  ambient: { A: ['x_______'], B: ['x_______'] },
  lofi: {
    A: ['x__x__x_', 'x___x__x', 'x_x___x_', '__x___x_'],
    B: ['x__x__x_', 'x_x_x_x_', 'x__x_x_x', '_x__x__x'],
  },
  piano: {
    A: ['x_______', 'x___x___', 'x__x____', 'x_______'],
    B: ['x___x_x_', 'x_x_x___', 'x__x__x_', 'x___x___'],
  },
};

/** Melody rhythms. The B section has more to say. */
const MELODY: Record<VibeFamily, Patterns> = {
  ambient: {
    A: ['x_______', '----x___', 'x___----', '--------'],
    B: ['x___x___', '--x_--x_', 'x_--x___'],
  },
  lofi: {
    A: ['x--x----', '--x_--x-', 'x---x_--', '----x--x', '--------'],
    B: ['x-x_--x-', 'x--x-x--', '[xx]-x_x---', 'x_--x-x_'],
  },
  piano: {
    A: ['x-x_----', '--x-x_--', 'x___x---', '----x-x_', 'x_______'],
    B: ['x-x-x_x-', 'x_x-x-x_', '[xx]x-x_--', 'x-x_x-x-', 'x---x-x_'],
  },
};

/** Bass rhythms. Ambient holds a drone across two bars, handled apart. */
const BASS: Record<VibeFamily, Patterns> = {
  ambient: { A: [], B: [] },
  lofi: { A: ['x__x__x_', 'x_____x_'], B: ['x__x__x_', 'x__x_x_x'] },
  piano: { A: ['x___x___', 'x_______'], B: ['x___x___', 'x__x__x_'] },
};

type DrumPattern = { hat?: string; kick?: string; rim?: string };

const DRUMS: Record<VibeFamily, { A: DrumPattern[]; B: DrumPattern[] }> = {
  ambient: { A: [{}], B: [{}] },
  lofi: {
    A: [
      { hat: 'xxxxxxxx', kick: 'x-----x-', rim: '--x---x-' },
      { hat: 'xxxxxxxx', kick: 'x--x--x-', rim: '--x---x-' },
    ],
    B: [
      { hat: 'xxxxxxxx', kick: 'x--x--x-', rim: '--x---x-' },
      { hat: 'x[xx]x[xx]xxx[xx]', kick: 'x-----xx', rim: '--x---x-' },
    ],
  },
  piano: {
    A: [{ kick: 'x-------', rim: '----x---' }, {}],
    B: [{ kick: 'x---x---', rim: '--x---x-' }],
  },
};

/** A pattern's hits, as beats from the bar start and lengths in beats. */
type Hit = { at: number; duration: number; index: number };

/**
 * Reads a scribbletune pattern into hits. The library counts in ticks and
 * cycles a note list through the `x`s; giving it one placeholder note per
 * hit keeps the note choice here, where the seed is.
 */
function hits(pattern: string): Hit[] {
  const events = clip({ notes: ['C4'], pattern, subdiv: '8n' });
  const result: Hit[] = [];
  let ticks = 0;
  let index = 0;

  for (const event of events) {
    if (event.note) {
      result.push({
        at: ticks / TICKS_PER_BEAT,
        duration: event.length / TICKS_PER_BEAT,
        index: index++,
      });
    }

    ticks += event.length;
  }

  return result;
}

function midiOf(name: string): number {
  return Note.midi(name) ?? 60;
}

export function composePiece(seed: number, style: VibeFamily): Piece {
  const random = createRandom(seed);
  const tonic = pick(random, TONICS);
  const mode: Mode = random() < 0.5 ? 'major' : 'minor';
  const tempo = TEMPO[style];
  const swing = SWING[style];

  /* The key's seventh chords, one per degree. */
  const diatonic =
    mode === 'major'
      ? Key.majorKey(tonic).chords
      : Key.minorKey(tonic).natural.chords;

  const choices = PROGRESSIONS[mode];
  const first = Math.floor(random() * choices.length);
  const second =
    (first + 1 + Math.floor(random() * (choices.length - 1))) % choices.length;

  const sections = [choices[first], choices[second]].map((degrees) =>
    degrees.map((degree) => diatonic[degree - 1])
  );

  /* Voicings that lead from chord to chord, one set per section. */
  const keysVoicings = sections.map((chords) =>
    Voicing.sequence(chords, KEYS_RANGE).map((notes) => notes.map(midiOf))
  );
  const padVoicings = sections.map((chords) =>
    Voicing.sequence(chords, PAD_RANGE).map((notes) => notes.map(midiOf))
  );

  /* The melody's notes: the mode's pentatonic across two octaves. */
  const pentatonic = Scale.get(`${tonic} ${mode} pentatonic`).notes;
  const tonicMidi = midiOf(`${tonic}3`);
  const scale: number[] = [];

  for (let octave = 1; octave <= 2; octave++) {
    pentatonic.forEach((name) => {
      const midi = midiOf(`${name}${octave}`);
      const above =
        midi < tonicMidi
          ? midi + 12 * Math.ceil((tonicMidi - midi) / 12)
          : midi;

      scale.push(above + (octave - 1) * 12);
    });
  }

  scale.sort((a, b) => a - b);

  /*
   * Each bar draws from its own generator, seeded from the piece and the bar
   * index, so `bar(n)` is the same whenever it is asked for and bars can be
   * requested in any order.
   */
  const bar = (index: number): Event[] => {
    const roll = createRandom(seed * 7919 + index * 104729);
    const section = Math.floor(index / SECTION_BARS) % 2;
    const late = Math.floor(index / SECTION_BARS) >= 2;
    const letter: keyof Patterns = section === 0 ? 'A' : 'B';
    const chordIndex = index % 4;
    const chord = keysVoicings[section][chordIndex];
    const pad = padVoicings[section][chordIndex];
    const root = midiOf(
      `${sections[section][chordIndex].replace(/[^A-G#b].*$/, '')}2`
    );
    const events: Event[] = [];

    const place = (at: number) =>
      at + (Math.abs((at % 1) - 0.5) < 0.01 ? swing : 0);

    /* Comping: the voicing, rolled slightly, on the pattern's hits. */
    if (style === 'ambient') {
      if (index % 2 === 0) {
        pad.forEach((midi, voice) => {
          events.push({
            at: 0,
            duration: 8.1,
            midi,
            velocity: 0.5 + voice * 0.05,
            voice: 'pad',
          });
        });
      }
    } else {
      hits(pick(roll, COMP[style][letter])).forEach((hit) => {
        chord.forEach((midi, voice) => {
          events.push({
            at: place(hit.at) + voice * 0.02,
            duration: Math.max(hit.duration, 1.2) * 1.1,
            midi,
            velocity: (hit.at === 0 ? 0.5 : 0.4) + roll() * 0.08,
            voice: 'keys',
          });
        });
      });
    }

    /* Melody: a walk through the scale that lands on a chord tone first. */
    const pattern = pick(roll, MELODY[style][letter]);
    const melody = hits(pattern);
    let position = Math.floor(scale.length * (0.35 + roll() * 0.3));

    melody.forEach((hit, order) => {
      const leap = roll() < 0.15;
      const step = leap ? (roll() < 0.5 ? -3 : 3) : Math.round(roll() * 4 - 2);

      position = Math.min(scale.length - 1, Math.max(0, position + step));

      let midi = scale[position];

      if (order === 0 || (hit.at % 1 === 0 && roll() < 0.6)) {
        /* Snap to the nearest chord tone in the octave above the voicing. */
        const tones = chord.map((tone) => tone + 12);
        const nearest = tones.reduce((best, tone) =>
          Math.abs(tone - midi) < Math.abs(best - midi) ? tone : best
        );

        midi = nearest;
        position = scale.findIndex((note) => note >= midi);
        position = position < 0 ? scale.length - 1 : position;
      }

      events.push({
        at: place(hit.at),
        duration: hit.duration * (style === 'ambient' ? 1.2 : 1.7),
        midi,
        velocity:
          (hit.at === 0 ? 0.85 : 0.7) + roll() * 0.12 + (late ? 0.05 : 0),
        voice: 'keys',
      });
    });

    /* Bass: the root, low; the fifth now and then on the second hit. */
    if (style === 'ambient') {
      if (index % 2 === 0) {
        events.push({
          at: 0,
          duration: 8.05,
          midi: Math.max(28, root - 12),
          velocity: 0.55,
          voice: 'bass',
        });
      }
    } else {
      hits(pick(roll, BASS[style][letter])).forEach((hit) => {
        const fifth = hit.index > 0 && roll() < 0.3;

        events.push({
          at: place(hit.at),
          duration: Math.max(hit.duration, 1.2),
          midi: Math.max(28, root - 12 + (fifth ? 7 : 0)),
          velocity: hit.index === 0 ? 0.65 : 0.55,
          voice: 'bass',
        });
      });
    }

    /* Drums. */
    const drums = pick(roll, DRUMS[style][letter]);

    (['kick', 'rim', 'hat'] as const).forEach((voice) => {
      const drumPattern = drums[voice];

      if (!drumPattern) {
        return;
      }

      hits(drumPattern).forEach((hit) => {
        const offbeat = hit.at % 1 !== 0;

        events.push({
          at: place(hit.at),
          duration: 0.1,
          midi: 0,
          velocity:
            voice === 'hat'
              ? offbeat
                ? 0.35
                : 0.55
              : hit.at === 0
                ? 0.8
                : 0.6,
          voice,
        });
      });
    });

    return events;
  };

  return {
    bar,
    chords: sections.flat(),
    mode,
    tempo,
    tonic,
  };
}
