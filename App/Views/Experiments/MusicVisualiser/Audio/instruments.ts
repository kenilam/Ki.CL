import {
  CacheStorage,
  Reverb,
  SplendidGrandPiano,
  type SplendidGrandPiano as Piano,
} from 'smplr';

/*
 * Sampled instruments, loaded once per engine and shared by every piece.
 *
 * The piano is the Splendid Grand: a Steinway sampled by Akai and released
 * as public domain, in four velocity layers, served as Opus. It is fetched
 * from the static bucket through the same-origin `/assets/static` route
 * unless the environment points somewhere else, and cached in the browser's
 * Cache API so the second visit costs nothing. While it loads, and if it
 * cannot load at all, the renderer falls back to the synthesised keys, so
 * the station never waits on the network to start.
 */

/**
 * Where sample sets live. `{repo}` is the name of the upstream repository
 * the set was mirrored from, so a bucket holds one folder per set under
 * `music/`, and a developer can point the whole thing at the mirror itself
 * to try a set before uploading it.
 */
export const DEFAULT_SAMPLES_URL = '/assets/static/music/{repo}';

const PIANO_REPO = 'sfzinstruments-splendid-grand-piano';

/**
 * The keys the station can reach, so only those samples are fetched: the
 * comping sits between G2 and G4 and the melody two octaves above the
 * tonic, so nothing below E2 or above G6 is ever asked for.
 */
const LOWEST_MIDI = 40;
const HIGHEST_MIDI = 91;

/**
 * The layers the station strikes: pianissimo through mezzo-forte. It never
 * whispers below that nor plays fortissimo, so the outer layers stay
 * unfetched. Three layers over the key range is about a hundred samples.
 */
const VELOCITY_RANGE: [number, number] = [41, 100];

/** How much of the piano goes to its own plate. The bus reverb adds the rest. */
const PIANO_REVERB_MIX = 0.12;

export type Instruments = {
  /**
   * Where the instruments play into. A piece connects it to its own tone
   * chain for as long as it runs, so the samples get the station's colour.
   */
  bus: GainNode;
  dispose(): void;
  /** True once every sample is decoded and the piano may be played. */
  readonly loaded: boolean;
  piano: Piano | null;
  ready: Promise<void>;
};

function sampleBase(template: string | undefined, repo: string): string {
  return (template || DEFAULT_SAMPLES_URL).replace('{repo}', repo);
}

export function loadInstruments(
  context: AudioContext,
  samplesUrl?: string
): Instruments {
  const bus = context.createGain();
  let loaded = false;
  let piano: Piano | null = null;

  const notes: number[] = [];

  for (let midi = LOWEST_MIDI; midi <= HIGHEST_MIDI; midi++) {
    notes.push(midi);
  }

  const ready = (async () => {
    try {
      const storage =
        typeof caches === 'undefined' ? undefined : CacheStorage('kicl-music');

      piano = SplendidGrandPiano(context, {
        baseUrl: `${sampleBase(samplesUrl, PIANO_REPO)}/samples`,
        decayTime: 0.7,
        destination: bus,
        notesToLoad: { notes, velocityRange: VELOCITY_RANGE },
        storage,
        volume: 100,
      });

      const plate = Reverb(context);

      await plate.ready();
      piano.output.addEffect('reverb', plate, PIANO_REVERB_MIX);

      await piano.ready;
      loaded = true;
    } catch (error) {
      /*
       * Expected wherever the samples are not hosted yet. The synthesised
       * keys carry the station; this only says why the real ones are absent.
       */
      console.warn('Music Visualiser: sampled piano unavailable', error);
      piano = null;
    }
  })();

  return {
    bus,
    dispose() {
      piano?.dispose();
      piano = null;
      loaded = false;
    },
    get loaded() {
      return loaded;
    },
    get piano() {
      return piano;
    },
    ready,
  };
}
