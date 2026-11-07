// Readers
import type { Style } from '@/views/experiments/kinetic-light/read/beat';

// Samples
import {
  DRUM_MACHINE,
  DRUM_MACHINE_URL,
} from '@/views/experiments/kinetic-light/song/player/samples/drum-machine';
import {
  DRUMS,
  DRUMS_URL,
  LOFI_URL,
} from '@/views/experiments/kinetic-light/song/player/samples/drums';
import {
  LINNDRUM,
  LINNDRUM_URL,
} from '@/views/experiments/kinetic-light/song/player/samples/linndrum';
import {
  PERCUSSION,
  PERCUSSION_URL,
} from '@/views/experiments/kinetic-light/song/player/samples/percussion';
import {
  PIANO,
  PIANO_URL,
} from '@/views/experiments/kinetic-light/song/player/samples/piano';
import {
  UPRIGHT,
  UPRIGHT_URL,
} from '@/views/experiments/kinetic-light/song/player/samples/upright';
import {
  WURLITZER,
  WURLITZER_URL,
} from '@/views/experiments/kinetic-light/song/player/samples/wurlitzer';

type Instrument = keyof typeof INSTRUMENTS | 'synth';

const STYLES: Style[] = ['kit', 'lofi', 'linndrum', 'machine', 'percussion'];

const INSTRUMENTS = {
  piano: { baseUrl: PIANO_URL, release: 1.2, urls: PIANO },
  upright: { baseUrl: UPRIGHT_URL, release: 1, urls: UPRIGHT },
  wurlitzer: { baseUrl: WURLITZER_URL, release: 0.6, urls: WURLITZER },
};

const SYNTH = {
  envelope: { attack: 0.002, decay: 1.6, release: 1, sustain: 0.15 },
  harmonicity: 3.01,
  modulationEnvelope: { attack: 0.002, decay: 0.5, release: 0.6, sustain: 0.2 },
  modulationIndex: 12,
};

const KITS = {
  kit: { baseUrl: DRUMS_URL, urls: DRUMS, volume: -6 },
  linndrum: { baseUrl: LINNDRUM_URL, urls: LINNDRUM, volume: -6.1 },
  lofi: { baseUrl: LOFI_URL, urls: DRUMS, volume: -4.9 },
  machine: { baseUrl: DRUM_MACHINE_URL, urls: DRUM_MACHINE, volume: -9.2 },
  percussion: { baseUrl: PERCUSSION_URL, urls: PERCUSSION, volume: -1.1 },
} satisfies Record<Style, object>;

const SINGLE = [{ gain: 1, interval: 0 }];

const VOICES = {
  grand: {
    brightness: 0,
    delay: 0,
    instrument: 'piano',
    layers: SINGLE,
    reverb: 0,
    volume: -6,
  },
  sixteen: {
    brightness: 8,
    delay: 0.3,
    instrument: 'piano',
    layers: [
      { gain: 1, interval: 0 },
      { gain: 0.7, interval: -12 },
    ],
    reverb: 0.4,
    volume: -9.2,
  },
  synth: {
    brightness: 0,
    delay: 0.2,
    instrument: 'synth',
    layers: SINGLE,
    reverb: 0.3,
    volume: 2.2,
  },
  upright: {
    brightness: 0,
    delay: 0,
    instrument: 'upright',
    layers: SINGLE,
    reverb: 0.15,
    volume: 13.5,
  },
  wurlitzer: {
    brightness: 0,
    delay: 0,
    instrument: 'wurlitzer',
    layers: SINGLE,
    reverb: 0.15,
    volume: -7.1,
  },
} satisfies Record<
  string,
  {
    brightness: number;
    delay: number;
    instrument: Instrument;
    layers: { gain: number; interval: number }[];
    reverb: number;
    volume: number;
  }
>;

const ARRANGED = {
  beat: {
    KIT: 'kit',
    LINNDRUM: 'linndrum',
    LOFI: 'lofi',
    MACHINE: 'machine',
    NONE: 'none',
    PERCUSSION: 'percussion',
  },
  voice: {
    GRAND: 'grand',
    SIXTEEN: 'sixteen',
    SYNTH: 'synth',
    UPRIGHT: 'upright',
    WURLITZER: 'wurlitzer',
  },
} as const;

export { ARRANGED, INSTRUMENTS, KITS, STYLES, SYNTH, VOICES, type Instrument };
