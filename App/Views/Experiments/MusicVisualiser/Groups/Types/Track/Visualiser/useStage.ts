import { useEffect, useRef, useState } from 'react';

import { createDirector } from './director';
import { createExtractor, emptyFeatures } from './features';
import { readNumber, readPalette } from './palette';
import { createRenderer } from './renderer';

/** Retina and beyond are capped; the scenes are soft and gain nothing past two. */
const MAX_PIXEL_RATIO = 2;

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/**
 * With reduced motion the stage still answers the music, but the field
 * itself does not drift: time is held, and only a few frames a second are
 * drawn so the picture changes without moving.
 */
const REDUCED_MOTION_INTERVAL_MS = 500;

/** How far the inks may lean warm or cool, drawn per track. */
const WARMTH_MIN = 0.35;
const WARMTH_RANGE = 0.5;

type Props = {
  analyser: AnalyserNode | null;
  canvas: HTMLCanvasElement | null;
  height: number;
  playing: boolean;
  /** Prefix of the canvas's custom properties: palette, cell, levels. */
  property: string;
  /** Changes when the track does; the picture cuts and redraws its look. */
  track: string | null;
  width: number;
};

/**
 * Draws the scenes into `canvas` every frame, fed by the analyser and
 * steered by the director. Everything random about the picture is decided
 * here: the director draws the scenes, and each track gets a fresh camera
 * phase and warmth.
 */
export default function useStage({
  analyser,
  canvas,
  height,
  playing,
  property,
  track,
  width,
}: Props): void {
  const director = useRef(createDirector());
  const look = useRef({ seed: Math.random(), warmth: 0.5 });
  const playingRef = useRef(playing);
  const [generation, setGeneration] = useState(0);

  playingRef.current = playing;

  useEffect(() => {
    if (track) {
      director.current.cut();
      look.current = {
        seed: Math.random(),
        warmth: WARMTH_MIN + Math.random() * WARMTH_RANGE,
      };
    }
  }, [track]);

  useEffect(() => {
    if (!canvas || !width || !height) {
      return;
    }

    const renderer = createRenderer(canvas);

    if (!renderer) {
      return;
    }

    const extractor = analyser ? createExtractor(analyser) : null;
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    const cell = readNumber(canvas, `${property}--cell`, 1) * ratio;
    const levels = readNumber(canvas, `${property}--levels`, 64);
    const reducedMotion = window.matchMedia(REDUCED_MOTION);
    /*
     * With nothing to listen to - the index, or a gate before any play - the
     * director still runs on silence, so the scenes keep changing on their
     * own clock instead of holding the first one.
     */
    const silence = emptyFeatures();
    const quiet = { fast: silence, medium: silence, slow: silence };

    renderer.resize(Math.ceil(width * ratio), Math.ceil(height * ratio));

    let palette = readPalette(canvas, property);
    let frame = 0;
    let last = performance.now();
    let seconds = 0;
    let lastDraw = -Infinity;

    const draw = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);

      last = now;

      if (extractor && playingRef.current) {
        extractor.update(dt);
      }

      const features = extractor?.smoothed ?? quiet;
      const still = reducedMotion.matches;

      if (!still) {
        seconds += dt;
      }

      director.current.update(dt, seconds, features);

      if (still && now - lastDraw < REDUCED_MOTION_INTERVAL_MS) {
        return;
      }

      lastDraw = now;

      const { state: scenes } = director.current;

      renderer.draw({
        cell,
        /*
         * The picture moves on the two-second features, not the frame ones:
         * a pool that swelled with every bass note twitched. Onsets still
         * reach the rings through the director, which reads the fast set.
         */
        features: features.medium,
        levels,
        mix: scenes.mix,
        palette,
        ringStrengths: scenes.ringStrengths,
        ringTimes: scenes.ringTimes,
        sceneA: scenes.sceneA,
        sceneB: scenes.sceneB,
        seconds,
        seed: look.current.seed,
        slowEnergy: features.slow.energy,
        spectrum: extractor?.spectrum ?? null,
        warmth: look.current.warmth,
      });
    };

    const loop = (now: number) => {
      frame = window.requestAnimationFrame(loop);
      draw(now);
    };

    const theme = new MutationObserver(() => {
      palette = readPalette(canvas, property);
    });

    theme.observe(document.body, {
      attributeFilter: ['class'],
      attributes: true,
    });

    const onLost = (event: Event) => {
      event.preventDefault();
      window.cancelAnimationFrame(frame);
    };

    const onRestored = () => {
      setGeneration((current) => current + 1);
    };

    canvas.addEventListener('webglcontextlost', onLost);
    canvas.addEventListener('webglcontextrestored', onRestored);
    frame = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(frame);
      theme.disconnect();
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onRestored);
      renderer.dispose();
    };
  }, [analyser, canvas, generation, height, property, width]);
}
