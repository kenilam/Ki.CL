import { useEffect, useRef, useState } from 'react';

// Partials
import { TALL_DROP } from './layout';
import { toPlaceAt } from './pick';
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

/** With the globe at rest only the stars' twinkle changes, and that needs few frames. */
const REST_INTERVAL_MS = 120;

/** Degrees from where it was asked to face at which the globe counts as at rest. */
const REST_DEGREES = 0.05;

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/** The share of the way to where it was asked to face that the globe turns each frame. */
const EASE = 0.08;

/** Degrees the globe turns for a drag across its own width. */
const DRAG_DEGREES = 180;

/** The custom property that holds the page's width, in rem. */
const COLUMN = '--kicl-columns-12';

/** The poles stay out of the middle, where the map folds. */
const MAX_LATITUDE = 70;

type Props = {
  /** Index into `places` of the one picked, or -1. */
  active: number;
  canvas: HTMLCanvasElement | null;
  /** Where the globe is asked to face. A new object turns it there. */
  centre: Coordinates;
  date: Date;
  /** On a tall page, how far below the middle the drawing sits. The page's own by default. */
  drop?: number;
  height: number;
  /** The light theme is on. */
  light: boolean;
  /** Told which place was clicked, by its index. */
  onPick?(place: number): void;
  /** Told where the globe was left facing when a drag ends. */
  onDrop?(facing: Coordinates): void;
  places: readonly Coordinates[];
  width: number;
};

type Handlers = Pick<
  React.ComponentProps<'canvas'>,
  'onPointerDown' | 'onPointerMove' | 'onPointerUp'
>;

/**
 * Draws the picture into `canvas` and turns the globe: eased toward `centre`
 * when that changes, and by hand while the pointer drags it.
 */
export function useOrb({
  active,
  canvas,
  centre,
  date,
  drop = TALL_DROP,
  height,
  light,
  onDrop,
  onPick,
  places,
  width,
}: Props): { handlers: Handlers; over: boolean } {
  const facing = useRef(centre);
  const target = useRef(centre);
  const drag = useRef<{ moved: boolean; x: number; y: number } | null>(null);
  const asked = useRef(centre);
  const [over, setOver] = useState(false);

  /** The place under the pointer, or -1. */
  const toPlace = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const { left, top } = event.currentTarget.getBoundingClientRect();
    const style = getComputedStyle(event.currentTarget);
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

    return toPlaceAt({
      column: parseFloat(style.getPropertyValue(COLUMN)) * rem || width,
      drop,
      height,
      places: places.map(toVector),
      view: toView(facing.current),
      width,
      x: event.clientX - left,
      y: event.clientY - top,
    });
  };
  const scene = useRef({ active, date, drop, light, places });

  scene.current = { active, date, drop, light, places };

  useEffect(() => {
    asked.current = centre;
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
      const rem = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      const column =
        parseFloat(getComputedStyle(canvas).getPropertyValue(COLUMN)) *
        rem *
        ratio;

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
          column: column || canvas.width,
          drop: scene.current.drop,
          active: scene.current.active,
          light: scene.current.light,
          places: scene.current.places.map(toVector),
          seconds: still.matches ? 0 : (now - start) / 1000,
          sun,
          sunSeen: toSeen(sun, view),
          turn: [
            ((facing.current.longitude % 360) + 360) % 360,
            facing.current.latitude,
          ],
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

  const handlers: Handlers = {
    onPointerDown: (event) => {
      event.currentTarget.setPointerCapture(event.pointerId);
      drag.current = { moved: false, x: event.clientX, y: event.clientY };
    },
    onPointerMove: (event) => {
      if (!drag.current) {
        setOver(toPlace(event) >= 0);

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
      drag.current = { moved: true, x: event.clientX, y: event.clientY };
    },
    onPointerUp: (event) => {
      const place = drag.current?.moved ? -1 : toPlace(event);

      if (place >= 0) {
        onPick?.(place);
      }

      if (drag.current?.moved) {
        const left = target.current;

        /*
         * Back to where it was asked to face. If the drop picks another
         * place, that arrives as a new `centre` and the globe goes there.
         */
        target.current = asked.current;
        onDrop?.(left);
      }

      drag.current = null;
    },
  };

  return { handlers, over };
}
