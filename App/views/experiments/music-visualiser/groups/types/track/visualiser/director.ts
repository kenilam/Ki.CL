import type { SceneName, Smoothed } from './spec';

import { MAX_RINGS } from './shader';

/*
 * Decides which scene is on and when to move to the next one. The draw is
 * its own business: any scene may follow any other, except the few shown
 * last, so the track has no say in the picture.
 *
 * A scene changes for one of three reasons: a new track started, the music
 * moved into a different section, or it has simply been on long enough.
 * A section change is read off the slow features: when the fifteen-second
 * average of energy or brightness has drifted far enough from where it was
 * when the scene began, the piece has gone somewhere else and the picture
 * should follow. Changes wait for an onset so the cut lands on a note, and
 * never come faster than the minimum dwell, so the eye can settle.
 */

/** Seconds a scene stays at least, and at most: about thirty, on average. */
const MIN_DWELL_SECONDS = 24;
const MAX_DWELL_SECONDS = 38;

/** Seconds a crossfade takes. */
const FADE_SECONDS = 6;

/**
 * How far the slow features must drift from the scene's baseline to count
 * as a new section. Energy runs wider than centroid, so it gets more room.
 */
const ENERGY_DRIFT = 0.12;
const CENTROID_DRIFT = 0.09;

/** Seconds to wait for an onset before cutting on the beat of the clock. */
const ONSET_PATIENCE_SECONDS = 2.5;

const SCENES: SceneName[] = [
  'pools',
  'clouds',
  'rings',
  'bars',
  'halo',
  'wave',
  'tunnel',
  'kaleidoscope',
  'stars',
  'terrain',
  'hive',
  'orb',
  'bloom',
];

/** How many of the last scenes a draw avoids, so the same few do not cycle. */
const RECENT_LENGTH = 4;

export type DirectorState = {
  /** From `0` (all `sceneA`) to `1` (all `sceneB`). */
  mix: number;
  ringStrengths: Float32Array;
  ringTimes: Float32Array;
  sceneA: SceneName;
  sceneB: SceneName;
};

export type Director = {
  /** A new track: cut to a scene drawn at random. */
  cut(): void;
  readonly state: DirectorState;
  /** Advance by `dt` seconds with the current features. */
  update(dt: number, now: number, features: Smoothed): void;
};

/** Any scene not seen lately, at random. */
function choose(recent: SceneName[]): SceneName {
  const fresh = SCENES.filter((scene) => !recent.includes(scene));

  return fresh[Math.floor(Math.random() * fresh.length)];
}

export function createDirector(): Director {
  const state: DirectorState = {
    mix: 0,
    ringStrengths: new Float32Array(MAX_RINGS),
    ringTimes: new Float32Array(MAX_RINGS).fill(-100),
    sceneA: 'pools',
    sceneB: 'pools',
  };

  let started = false;
  let fading = false;
  let dwell = 0;
  let waitingForOnset = 0;
  let pendingCut = false;
  let baselineEnergy = 0;
  let baselineCentroid = 0;
  let baselineSet = false;
  let ringCursor = 0;
  let recent: SceneName[] = [];

  const begin = (next: SceneName) => {
    if (fading) {
      // Already halfway somewhere: land there first, then go on.
      state.sceneA = state.sceneB;
    }

    recent = [...recent, next].slice(-RECENT_LENGTH);
    state.sceneB = next;
    state.mix = 0;
    fading = true;
    dwell = 0;
    pendingCut = false;
    waitingForOnset = 0;
    baselineSet = false;
  };

  return {
    cut() {
      started = true;
      begin(choose(recent));
    },
    state,
    update(dt, now, features) {
      dwell += dt;

      // Onsets ring: record each one for the rings scene.
      if (
        features.fast.onset > 0.35 &&
        now - state.ringTimes[ringCursor] > 0.1
      ) {
        const slot = ringCursor;

        state.ringTimes[slot] = now;
        state.ringStrengths[slot] = Math.min(1, features.fast.onset);
        ringCursor = (ringCursor + 1) % MAX_RINGS;
      }

      if (fading) {
        state.mix = Math.min(1, state.mix + dt / FADE_SECONDS);

        if (state.mix >= 1) {
          state.sceneA = state.sceneB;
          state.mix = 0;
          fading = false;
        }

        return;
      }

      if (!started) {
        return;
      }

      // The baseline is taken once the fade has settled, not mid-cut.
      if (!baselineSet) {
        baselineEnergy = features.slow.energy;
        baselineCentroid = features.slow.centroid;
        baselineSet = true;
      }

      if (!pendingCut && dwell >= MIN_DWELL_SECONDS) {
        const drifted =
          Math.abs(features.slow.energy - baselineEnergy) > ENERGY_DRIFT ||
          Math.abs(features.slow.centroid - baselineCentroid) > CENTROID_DRIFT;

        if (drifted || dwell >= MAX_DWELL_SECONDS) {
          pendingCut = true;
          waitingForOnset = 0;
        }
      }

      if (pendingCut) {
        waitingForOnset += dt;

        const onBeat = features.fast.onset > 0.2;

        if (onBeat || waitingForOnset >= ONSET_PATIENCE_SECONDS) {
          begin(choose(recent));
        }
      }
    },
  };
}
