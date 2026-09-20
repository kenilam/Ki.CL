import React, { useEffect, useRef, useState } from 'react';

// Libraries
import classNames from 'classnames';

// Hooks
import { useResizeObserver } from '@/Hooks';

// Spec
import type { Track } from './Spec';

// Audio
import type { Engine } from './Audio/engine';

// Scenes
import { createRenderer, type Palette } from './Scenes/renderer';

// Director
import { createDirector } from './Director';

// Constants
import { CLASS_NAME as VIEW } from './constants';

const CLASS_NAME = `${VIEW}__stage`;

const PROPERTY = `--${CLASS_NAME}`;

/** Retina and beyond are capped; the scenes are soft and gain nothing past two. */
const MAX_PIXEL_RATIO = 2;

/** How many inks the stylesheet may declare; reading stops at the first gap. */
const MAX_INKS = 6;

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/**
 * With reduced motion the stage still answers the music, but the field
 * itself does not drift: time is held, and only a few frames a second are
 * drawn so the picture changes without moving.
 */
const REDUCED_MOTION_INTERVAL_MS = 500;

type Props = {
  engine: Engine | null;
  playing: boolean;
  track: Track | null;
};

/**
 * Every colour comes from the stylesheet, as custom properties on the
 * canvas, so the theme decides them and this file only reads. A 2D context
 * normalises whatever form the token was written in to `#rrggbb`.
 */
function readPalette(canvas: HTMLCanvasElement): Palette {
  const styles = window.getComputedStyle(canvas);
  const scratch = document.createElement('canvas').getContext('2d');

  const parse = (value: string): number | null => {
    const trimmed = value.trim();

    if (!trimmed || !scratch) {
      return null;
    }

    scratch.fillStyle = trimmed;

    const normalised = String(scratch.fillStyle);

    if (!/^#[\da-f]{6}$/i.test(normalised)) {
      return null;
    }

    return parseInt(normalised.slice(1), 16);
  };

  const paper = parse(styles.getPropertyValue(`${PROPERTY}--paper`)) ?? 0;
  const inks: number[] = [];

  for (let index = 1; index <= MAX_INKS; index++) {
    const ink = parse(styles.getPropertyValue(`${PROPERTY}--ink-${index}`));

    if (ink === null) {
      break;
    }

    inks.push(ink);
  }

  return { inks, paper };
}

function readNumber(
  canvas: HTMLCanvasElement,
  name: string,
  fallback: number
): number {
  const value = parseFloat(
    window.getComputedStyle(canvas).getPropertyValue(`${PROPERTY}--${name}`)
  );

  return Number.isFinite(value) && value > 0 ? value : fallback;
}

/**
 * The picture. A canvas the size of the view, drawn by the scene shader at
 * device resolution every frame the music plays, fed by the engine's
 * features and steered by the director.
 */
const Stage: React.FunctionComponent<Props> = ({ engine, playing, track }) => {
  const { node, rect } = useResizeObserver<HTMLCanvasElement>();
  const [generation, setGeneration] = useState(0);
  const director = useRef(createDirector());
  const playingRef = useRef(playing);

  const width = rect?.width ?? 0;
  const height = rect?.height ?? 0;

  playingRef.current = playing;

  useEffect(() => {
    if (track) {
      director.current.setVibe(track.vibe);
    }
  }, [track]);

  useEffect(() => {
    const canvas = node.current;

    if (!canvas || !width || !height) {
      return;
    }

    const renderer = createRenderer(canvas);

    if (!renderer) {
      return;
    }

    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    const cell = readNumber(canvas, 'cell', 1) * ratio;
    const levels = readNumber(canvas, 'levels', 64);
    const reducedMotion = window.matchMedia(REDUCED_MOTION);

    renderer.resize(Math.ceil(width * ratio), Math.ceil(height * ratio));

    let palette = readPalette(canvas);
    let frame = 0;
    let last = performance.now();
    let seconds = 0;
    let lastDraw = -Infinity;

    const draw = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);

      last = now;

      if (engine && playingRef.current) {
        engine.update(dt);
      }

      const features = engine?.features;
      const still = reducedMotion.matches;

      if (!still) {
        seconds += dt;
      }

      if (features) {
        director.current.update(dt, seconds, features);
      }

      if (still && now - lastDraw < REDUCED_MOTION_INTERVAL_MS) {
        return;
      }

      lastDraw = now;

      const { state } = director.current;

      renderer.draw({
        cell,
        /*
         * The picture moves on the two-second features, not the frame ones:
         * a pool that swelled with every bass note twitched. Onsets still
         * reach the rings through the director, which reads the fast set.
         */
        features: features?.medium ?? {
          centroid: 0,
          energy: 0,
          flux: 0,
          high: 0,
          low: 0,
          mid: 0,
          onset: 0,
        },
        levels,
        mix: state.mix,
        palette,
        ringStrengths: state.ringStrengths,
        ringTimes: state.ringTimes,
        sceneA: state.sceneA,
        sceneB: state.sceneB,
        seconds,
        slowEnergy: features?.slow.energy ?? 0,
        warmth: track?.vibe.warmth ?? 0.5,
      });
    };

    const loop = (now: number) => {
      frame = window.requestAnimationFrame(loop);
      draw(now);
    };

    const theme = new MutationObserver(() => {
      palette = readPalette(canvas);
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
    // `track` is read through the director; a change there must not rebuild the GL state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node, width, height, engine, generation]);

  return (
    <canvas
      aria-hidden
      className={classNames(
        CLASS_NAME,
        'kicl-inset-0',
        'kicl-pointer-events-none',
        'kicl-position-absolute'
      )}
      ref={node}
    />
  );
};

export { CLASS_NAME };
export default Stage;
