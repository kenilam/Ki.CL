import React, { useEffect } from 'react';

// Libraries
import classNames from 'classnames';

// Hooks
import { useResizeObserver } from '@/Hooks';

// Spec
import type * as Spec from './Spec';

// Renderer
import { paint } from './dither';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--views--home--background';

const PROPERTY = `--${CLASS_NAME}`;

/**
 * Frames per second the drift is redrawn at. The motion is slow enough that
 * more would only spend battery; fewer and the grain visibly steps.
 */
const FRAME_INTERVAL_MS = 100;

/** How many inks the stylesheet may declare; it stops at the first gap. */
const MAX_INKS = 8;

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/**
 * Every colour and the cell size live in the stylesheet, as custom
 * properties on the canvas, so the theme owns them and the renderer only
 * reads. Colours come back in whatever form the token was written in; a 2D
 * context normalises any of them to `#rrggbb`.
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

function readCell(canvas: HTMLCanvasElement): number {
  const value = parseFloat(
    window.getComputedStyle(canvas).getPropertyValue(`${PROPERTY}--cell`)
  );

  return Number.isFinite(value) && value >= 1 ? value : 1;
}

/**
 * The dithered light behind the home page.
 *
 * A canvas the size of the section, rendered at one pixel per dither cell
 * and scaled up by CSS. It redraws on a slow clock so the pools of ink drift,
 * stops at a single frame for anyone who asked for reduced motion, and
 * re-reads its colours whenever the theme class on `body` changes.
 */
const Background: React.FunctionComponent<Spec.Props> = ({
  className,
  ...rest
}) => {
  const { node, rect } = useResizeObserver<HTMLCanvasElement>();

  const width = rect?.width ?? 0;
  const height = rect?.height ?? 0;

  useEffect(() => {
    const canvas = node.current;

    if (!canvas || !width || !height) {
      return;
    }

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    const cell = readCell(canvas);

    canvas.width = Math.ceil(width / cell);
    canvas.height = Math.ceil(height / cell);

    const image = context.createImageData(canvas.width, canvas.height);
    const reducedMotion = window.matchMedia(REDUCED_MOTION);

    let palette = readPalette(canvas);
    let frame = 0;
    let last = -Infinity;

    const draw = (now: number) => {
      paint(context, image, now / 1000, palette);
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

    reducedMotion.addEventListener('change', start);
    start();

    return () => {
      window.cancelAnimationFrame(frame);
      theme.disconnect();
      reducedMotion.removeEventListener('change', start);
    };
  }, [node, width, height]);

  return (
    <canvas
      aria-hidden
      className={classNames(
        CLASS_NAME,
        'kicl-inset-0',
        'kicl-pointer-events-none',
        'kicl-position-absolute',
        className
      )}
      ref={node}
      {...rest}
    />
  );
};

export { CLASS_NAME };
export default Background;
