import React, { useEffect, useRef, useState } from 'react';

// Libraries
import classNames from 'classnames';

// Routes
import { Outlet } from '@/Router';

// Components
import { Layout } from '@/Components';

// Hooks
import { useResizeObserver } from '@/Hooks';

// Context
import { RadioContext } from './Context';

// Scenes
import { createRenderer, type Palette } from './Scenes/renderer';

// Director
import { createDirector } from './Director';

// Hooks
import useRadio from './useRadio';

// Styles
import './Styles.scss';

// Constants
import { CLASS_NAME, trackKey } from './constants';

const STAGE_CLASS_NAME = `${CLASS_NAME}__stage`;

const PROPERTY = `--${STAGE_CLASS_NAME}`;

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

/** A track's key folded to a number in `[0, 1]`, for the camera's phases. */
function seedOf(key: string): number {
  let hash = 2166136261;

  for (let index = 0; index < key.length; index++) {
    hash = Math.imul(hash ^ key.charCodeAt(index), 16777619);
  }

  return ((hash >>> 0) % 10007) / 10007;
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
 * The shell: the picture, and the radio the routes beneath it drive. The
 * picture is a canvas the size of the view, drawn by the scene shader at
 * device resolution every frame the music plays, fed by the engine's
 * features and steered by the director. The routes draw the rest - the
 * gates and the controls - through the outlet.
 */
const MusicVisualiser: React.FunctionComponent = () => {
  const radio = useRadio();
  const { engine, state, track } = radio;
  const playing = state === 'playing';

  const { node, rect } = useResizeObserver<HTMLCanvasElement>();
  const [generation, setGeneration] = useState(0);
  const director = useRef(createDirector());
  const playingRef = useRef(playing);
  const seedRef = useRef(0);

  const width = rect?.width ?? 0;
  const height = rect?.height ?? 0;

  playingRef.current = playing;

  useEffect(() => {
    if (track) {
      director.current.setVibe(track.vibe);
      seedRef.current = seedOf(trackKey(track));
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

      const { state: scenes } = director.current;

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
        mix: scenes.mix,
        palette,
        ringStrengths: scenes.ringStrengths,
        ringTimes: scenes.ringTimes,
        sceneA: scenes.sceneA,
        sceneB: scenes.sceneB,
        seconds,
        seed: seedRef.current,
        slowEnergy: features?.slow.energy ?? 0,
        spectrum: engine?.spectrum ?? null,
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
    <RadioContext.Provider value={radio}>
      <Layout autoFlow='row' gap='none'>
        <section className={classNames(CLASS_NAME, 'kicl-position-relative')}>
          <canvas
            aria-hidden
            className={classNames(
              STAGE_CLASS_NAME,
              'kicl-inset-0',
              'kicl-pointer-events-none',
              'kicl-position-absolute'
            )}
            ref={node}
          />
          <Outlet />
        </section>
      </Layout>
    </RadioContext.Provider>
  );
};

export default MusicVisualiser;
