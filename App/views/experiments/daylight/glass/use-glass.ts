import { useEffect, useRef } from 'react';

// Partials
import { createRenderer } from './renderer';

// Utilities
import {
  toSeen,
  toSubsolar,
  toVector,
  toView,
  type Coordinates,
} from '@/views/experiments/daylight/sun';

// Assets
import land from './land.png';

/** Retina is capped; every pixel runs the whole shader. */
const MAX_PIXEL_RATIO = 1.5;

/** With the globe at rest only the glass's flicker changes, and that needs few frames. */
const REST_INTERVAL_MS = 120;

/** Degrees from where it was asked to face at which the globe counts as at rest. */
const REST_DEGREES = 0.05;

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/** The share of the way to where it was asked to face that the globe turns each frame. */
const EASE = 0.08;

/** Degrees the globe turns for a drag across its own width. */
const DRAG_DEGREES = 180;

/** The poles stay out of the middle, where the map folds. */
const MAX_LATITUDE = 70;

type Props = {
  /** Index into `places` of the one picked, or -1. */
  active: number;
  canvas: HTMLCanvasElement | null;
  /** Where the globe is asked to face. A new object turns it there. */
  centre: Coordinates;
  date: Date;
  height: number;
  places: readonly Coordinates[];
  width: number;
};

type Handlers = Pick<
  React.ComponentProps<'canvas'>,
  'onPointerDown' | 'onPointerMove' | 'onPointerUp'
>;

/**
 * Draws the window into `canvas` and turns the globe: eased toward `centre`
 * when that changes, and by hand while the pointer drags it.
 */
export function useGlass({
  active,
  canvas,
  centre,
  date,
  height,
  places,
  width,
}: Props): Handlers {
  const facing = useRef(centre);
  const target = useRef(centre);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const scene = useRef({ active, date, places });

  scene.current = { active, date, places };

  useEffect(() => {
    target.current = centre;
  }, [centre]);

  useEffect(() => {
    if (!canvas || !width || !height) {
      return;
    }

    let frame = 0;
    let cancelled = false;
    let dispose = () => {};
    const picture = new Image();

    picture.onload = () => {
      const renderer = cancelled ? null : createRenderer(canvas, picture);

      if (!renderer) {
        return;
      }

      const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
      const still = window.matchMedia(REDUCED_MOTION);
      const start = performance.now();

      renderer.resize(Math.ceil(width * ratio), Math.ceil(height * ratio));
      dispose = renderer.dispose;

      let drawn = -Infinity;

      const loop = (now: number) => {
        frame = window.requestAnimationFrame(loop);

        const { latitude, longitude } = facing.current;
        /* The short way round, so Tokyo to Los Angeles crosses the Pacific. */
        const turn =
          ((((target.current.longitude - longitude + 180) % 360) + 360) % 360) -
          180;
        const ease = still.matches ? 1 : EASE;
        const resting =
          Math.abs(turn) < REST_DEGREES &&
          Math.abs(target.current.latitude - latitude) < REST_DEGREES;

        if (resting && now - drawn < REST_INTERVAL_MS) {
          return;
        }

        drawn = now;

        facing.current = {
          latitude: latitude + (target.current.latitude - latitude) * ease,
          longitude: longitude + turn * ease,
        };

        const view = toView(facing.current);
        const sun = toVector(toSubsolar(scene.current.date));

        renderer.draw({
          active: scene.current.active,
          places: scene.current.places.map(toVector),
          seconds: still.matches ? 0 : (now - start) / 1000,
          sun,
          sunSeen: toSeen(sun, view),
          view,
        });
      };

      frame = window.requestAnimationFrame(loop);
    };
    picture.src = land;

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      dispose();
    };
  }, [canvas, height, width]);

  return {
    onPointerDown: (event) => {
      event.currentTarget.setPointerCapture(event.pointerId);
      drag.current = { x: event.clientX, y: event.clientY };
    },
    onPointerMove: (event) => {
      if (!drag.current) {
        return;
      }

      const scale = DRAG_DEGREES / Math.min(width, height);
      const latitude =
        target.current.latitude + (event.clientY - drag.current.y) * scale;

      target.current = {
        latitude: Math.max(-MAX_LATITUDE, Math.min(MAX_LATITUDE, latitude)),
        longitude:
          target.current.longitude - (event.clientX - drag.current.x) * scale,
      };
      drag.current = { x: event.clientX, y: event.clientY };
    },
    onPointerUp: () => {
      drag.current = null;
    },
  };
}
