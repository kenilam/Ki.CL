import React, { useEffect, useState } from 'react';

// Libraries
import classNames from 'classnames';

// Hooks
import { useResizeObserver } from '@/hooks';

// Spec
import type * as Spec from './spec';

// Renderer
import { createRenderer } from './dither';

// Styles
import './styles.scss';

const CLASS_NAME = 'kicl--views--home--background';

const PROPERTY = `--${CLASS_NAME}`;

/**
 * Frames per second the drift is redrawn at. The motion is slow enough that
 * more would only spend battery; fewer and the screen visibly steps.
 */
const FRAME_INTERVAL_MS = 66;

/**
 * Retina and beyond are capped at two device pixels per CSS pixel. The screen
 * is drawn per device pixel, so beyond that it costs fill rate for a texture
 * nobody can resolve.
 */
const MAX_PIXEL_RATIO = 2;

/** How many inks the stylesheet may declare; it stops at the first gap. */
const MAX_INKS = 6;

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/**
 * Every colour, the cell size and the tone count live in the stylesheet, as
 * custom properties on the canvas, so the theme owns them and the renderer
 * only reads. Colours come back in whatever form the token was written in; a
 * 2D context normalises any of them to `#rrggbb`.
 */
function readPalette(canvas: HTMLCanvasElement): Spec.Palette {
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
 * The dithered light behind the home page.
 *
 * A canvas the size of the section, drawn by a fragment shader at device
 * resolution. It redraws on a slow clock so the pools of ink drift, stops at
 * a single frame for anyone who asked for reduced motion, and re-reads its
 * colours whenever the theme class on `body` changes. If the GPU takes the
 * context away, it is set up again once it comes back.
 */
const Background: React.FunctionComponent<Spec.Props> = ({
  className,
  ...rest
}) => {
  const { node, rect } = useResizeObserver<HTMLCanvasElement>();
  const [generation, setGeneration] = useState(0);

  const width = rect?.width ?? 0;
  const height = rect?.height ?? 0;

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
    const levels = readNumber(canvas, 'levels', 48);
    const reducedMotion = window.matchMedia(REDUCED_MOTION);

    renderer.resize(Math.ceil(width * ratio), Math.ceil(height * ratio));

    let palette = readPalette(canvas);
    let frame = 0;
    let last = -Infinity;

    const draw = (now: number) => {
      renderer.draw(now / 1000, palette, cell, levels);
    };

    const loop = (now: number) => {
      frame = window.requestAnimationFrame(loop);

      if (now - last < FRAME_INTERVAL_MS) {
        return;
      }

      last = now;
      draw(now);
    };

    const start = () => {
      window.cancelAnimationFrame(frame);
      draw(performance.now());

      if (!reducedMotion.matches) {
        frame = window.requestAnimationFrame(loop);
      }
    };

    const theme = new MutationObserver(() => {
      palette = readPalette(canvas);
      draw(performance.now());
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
    reducedMotion.addEventListener('change', start);
    start();

    return () => {
      window.cancelAnimationFrame(frame);
      theme.disconnect();
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onRestored);
      reducedMotion.removeEventListener('change', start);
      renderer.dispose();
    };
  }, [node, width, height, generation]);

  return (
    <canvas
      aria-hidden
      className={classNames(
        CLASS_NAME,
        'kicl-block-size-full',
        'kicl-inline-size-full',
        'kicl-inset-0',
        'kicl-pointer-events-none',
        'kicl-position-absolute',
        className
      )}
      {...rest}
      // After the spread: a wrapper such as Animation passes its own ref, and
      // the renderer needs this one on the canvas.
      ref={node}
    />
  );
};

export { CLASS_NAME, Background };
