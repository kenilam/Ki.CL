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

/**
 * How a piece is dressed: the drum tuning, the bass's bite, where its tone
 * closes and how wet it is. Seeded per piece, so two lo-fi tracks in a row
 * do not share a kick.
 */
export type Kit = {
  /** Bass overtone level, 0 to 1: more is a plucked string, less a sub. */
  bassBite: number;
  /** Hat band centre in hertz. */
  hatHz: number;
  /** Kick decay in seconds, and where its pitch starts. */
  kickDecay: number;
  kickHz: number;
  /** Reverb send, 0 to 1. */
  reverb: number;
  /** Multiplier on the station's tone low-pass. */
  toneScale: number;
};

export type Piece = {
  /** Events of bar `index`, from zero. Deterministic for a given index. */
  bar(index: number): Event[];
  chords: string[];
  kit: Kit;
  mode: Mode;
  /** Section of bar `index`: 0 for A, 1 for B. */
  section(index: number): number;
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

/** How far a piece's tempo may sit from its station's, either way. */
const TEMPO_SPREAD = 0.07;

/** Bars per phrase, for fills and breakdowns. */
const PHRASE_BARS = 4;

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
  lofi: {
    A: ['x__x__x_', 'x_____x_', 'x___x_x_', 'x__x___x', 'x_x___x_'],
    B: ['x__x__x_', 'x__x_x_x', 'x_x__x_x', 'x__x__xx', 'xx__x__x'],
  },
  piano: {
    A: ['x___x___', 'x_______', 'x_____x_', 'x___x__x'],
    B: ['x___x___', 'x__x__x_', 'x___x_x_', 'x__x____'],
  },
};

type DrumPattern = { hat?: string; kick?: string; rim?: string };

/**
 * Drum parts are drawn a voice at a time - a kick from one list, a rim from
 * another, a hat from a third - so the combinations run to dozens rather
 * than the handful a fixed set of kits would give.
 */
const KICKS: Record<VibeFamily, Patterns> = {
  ambient: { A: [], B: [] },
  lofi: {
    A: ['x-----x-', 'x--x--x-', 'x-----x-', 'x---x---', 'x--x----'],
    B: ['x--x--x-', 'x-----xx', 'x--x-x--', 'x---x-x-', 'x-x---x-'],
  },
  piano: {
    A: ['x-------', 'x---x---', ''],
    B: ['x---x---', 'x-----x-', 'x--x----'],
  },
};

const RIMS: Record<VibeFamily, Patterns> = {
  ambient: { A: [], B: [] },
  lofi: {
    A: ['--x---x-', '--x---x-', '----x---', '--x---x-'],
    B: ['--x---x-', '--x---xx', '--x--x--', '--x---x-'],
  },
  piano: {
    A: ['----x---', '', '--x---x-'],
    B: ['--x---x-', '----x---', '--x-----'],
  },
};

const HATS: Record<VibeFamily, Patterns> = {
  ambient: { A: [], B: [] },
  lofi: {
    A: ['xxxxxxxx', 'x-x-x-x-', '-x-x-x-x', 'xxxxxxxx', 'x-xxx-xx'],
    B: ['xxxxxxxx', 'x[xx]x[xx]xxx[xx]', 'xx-xxx-x', '[xx]xx[xx]xxx'],
  },
  piano: {
    A: ['', '', '-x-x-x-x'],
    B: ['', '-x-x-x-x', 'x-x-x-x-'],
  },
};

/** The last bar of a phrase may turn over: a fill on the kick and rim. */
const FILLS: DrumPattern[] = [
  { kick: 'x--x--xx', rim: '--x---xx' },
  { kick: 'x-----x-', rim: '--x-x-x-' },
  { kick: 'x--x-x-x', rim: '--x---x-' },
  { kick: 'x---x---', rim: '--x-xxxx' },
];

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
  const tempo = Math.round(
    TEMPO[style] * (1 + (random() * 2 - 1) * TEMPO_SPREAD)
  );
  const swing = SWING[style] * (0.6 + random() * 0.8);

  /* The kit: every knob a piece has, set once, from the seed. */
  const kit: Kit = {
    bassBite: 0.08 + random() * 0.3,
    hatHz: 3200 + random() * 2400,
    kickDecay: 0.22 + random() * 0.2,
    kickHz: 85 + random() * 50,
    reverb: (style === 'ambient' ? 0.55 : 0.22) + random() * 0.18,
    toneScale: 0.8 + random() * 0.45,
  };

  /* Does the second section lift the melody an octave? Some pieces do. */
  const lift = random() < 0.35 ? 12 : 0;

  /* Which phrases drop the drums for a bar or two: a breath, not a stop. */
  const breakdownAt = 16 + Math.floor(random() * 2) * 8;

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
  const sectionOf = (index: number) => Math.floor(index / SECTION_BARS) % 2;

  const bar = (index: number): Event[] => {
    const roll = createRandom(seed * 7919 + index * 104729);
    const section = sectionOf(index);
    const late = Math.floor(index / SECTION_BARS) >= 2;
    const letter: keyof Patterns = section === 0 ? 'A' : 'B';
    const phrase = index % PHRASE_BARS;
    const chordIndex = index % 4;
    const chord = keysVoicings[section][chordIndex];
    const pad = padVoicings[section][chordIndex];
    const root = midiOf(
      `${sections[section][chordIndex].replace(/[^A-G#b].*$/, '')}2`
    );
    const events: Event[] = [];

    /*
     * The arc: every phrase rises a little to its last bar, the B section
     * sits above the A, and the second time round is a shade stronger.
     */
    const arc =
      0.9 +
      0.08 * (phrase / (PHRASE_BARS - 1)) +
      section * 0.05 +
      (late ? 0.04 : 0);

    /* A fill closes most phrases; a breakdown opens one, drums out. */
    const fill = phrase === PHRASE_BARS - 1 && roll() < 0.55;
    const breakdown = index >= breakdownAt && index < breakdownAt + 2;

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
            velocity: ((hit.at === 0 ? 0.5 : 0.4) + roll() * 0.08) * arc,
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
        midi: midi + (section === 1 ? lift : 0),
        velocity: ((hit.at === 0 ? 0.85 : 0.7) + roll() * 0.12) * arc,
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
      const low = Math.max(28, root - 12);
      const bassHits = hits(pick(roll, BASS[style][letter]));

      bassHits.forEach((hit) => {
        /* The root first; after it, sometimes the fifth or the octave. */
        const colour =
          hit.index === 0 ? 0 : roll() < 0.3 ? 7 : roll() < 0.15 ? 12 : 0;

        events.push({
          at: place(hit.at),
          duration: Math.max(hit.duration, 1.2),
          midi: low + colour,
          velocity: (hit.index === 0 ? 0.65 : 0.55) * arc,
          voice: 'bass',
        });
      });

      /* Lo-fi walks into the next bar: a note below the coming root on the last eighth. */
      if (style === 'lofi' && roll() < 0.4) {
        const nextRoot = midiOf(
          `${sections[section][(chordIndex + 1) % 4].replace(/[^A-G#b].*$/, '')}2`
        );

        events.push({
          at: place(3.5),
          duration: 0.45,
          midi: Math.max(28, nextRoot - 12 + (roll() < 0.5 ? -1 : 2)),
          velocity: 0.45 * arc,
          voice: 'bass',
        });
      }
    }

    /* Drums: a kick, a rim and a hat each drawn on their own, or a fill. */
    if (!breakdown) {
      const filled = fill ? pick(roll, FILLS) : null;
      const parts: DrumPattern = {
        hat: pick(roll, HATS[style][letter]),
        kick: filled?.kick ?? pick(roll, KICKS[style][letter]),
        rim: filled?.rim ?? pick(roll, RIMS[style][letter]),
      };

      (['kick', 'rim', 'hat'] as const).forEach((voice) => {
        const drumPattern = parts[voice];

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
              (voice === 'hat'
                ? offbeat
                  ? 0.3 + roll() * 0.1
                  : 0.5 + roll() * 0.1
                : hit.at === 0
                  ? 0.8
                  : 0.55 + roll() * 0.1) * arc,
            voice,
          });
        });
      });
    }

    return events;
  };

  return {
    bar,
    chords: sections.flat(),
    kit,
    mode,
    section: sectionOf,
    tempo,
    tonic,
  };
}
