import React, { useEffect, useRef, useSyncExternalStore } from 'react';

// Components
import { Badge, HyperLink } from '@/components';

// Constants
import {
  CLASS_NAME,
  toNodePath,
} from '@/views/experiments/tree-of-life/versions/v15/constants';

// Styles
import './styles.scss';

// Place
import { place } from './place';

// Store
import { getVersion, registry, store, subscribe } from './store';

// Projector
import { LabelProjector } from './projector';

/**
 * Labels live in screen space, not in the scene.
 *
 * Two reasons. They must not scale with the camera - a name is text, and text
 * that shrinks as you pull back stops being readable long before the thing it
 * names does. And they have to be placed against each other, which is a
 * two-dimensional problem: only once everything is projected is it knowable
 * whether two names overlap.
 *
 * So a projector inside the Canvas publishes screen coordinates each frame,
 * and a DOM layer outside it seats the pills against an occupancy grid. Each
 * pill is a `Badge` - being DOM they are pixel-sized by definition and inherit
 * the app's chip styling rather than reimplementing it in a texture.
 *
 * The split is between *what* and *where*. React owns the set of labels, which
 * changes only when the tree does; the frame loop owns their placement, which
 * changes every frame and never re-renders anything - it writes `transform`
 * and a seated flag straight onto the elements React mounted.
 */

/**
 * A pill's own styling on top of `Badge`'s `outline` variant, which already
 * carries the chip's background, border, radius, padding and backdrop blur.
 * The local class adds only what a *floating* chip needs.
 */
/*
 * Each pill takes pointer events, so a name can be followed to its taxon. The
 * layer beneath stays transparent to them, so a drag begun anywhere else still
 * reaches the canvas and turns the view - only a drag begun on a name does not.
 */
const PILL_CLASS = [
  `${CLASS_NAME}__label`,
  'kicl-border-radius-sm',
  'kicl-display-inline-flex',
  'kicl-inset-block-start-0',
  'kicl-inset-inline-start-0',
  'kicl-text-nowrap',
  'kicl-position-absolute',
  'kicl-pointer-events-auto',
  'kicl-font-size-small',
].join(' ');

/** DOM layer. Sits outside the Canvas and seats the pills each frame. */
const Labels: React.FunctionComponent = () => {
  const hostRef = useRef<HTMLElement>(null);
  const pillsRef = useRef<Map<string, HTMLElement>>(new Map());

  // Re-render when labels are added or removed - never when they move.
  useSyncExternalStore(subscribe, getVersion, getVersion);

  useEffect(() => {
    let raf = 0;

    const tick = () => {
      const host = hostRef.current;

      if (host && store.width) {
        place(host, pillsRef.current);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <nav
      aria-label='Taxa in view'
      ref={hostRef}
      className={`${CLASS_NAME}__labels kicl-inset-0 kicl-position-absolute kicl-pointer-events-none`}
    >
      {[...registry.entries()].map(([key, label]) => (
        /*
         * The link is the seated element, not the chip inside it: the frame
         * loop transforms whatever it holds a reference to, and reads
         * `data-seated` off the same node to fade it in.
         */
        <HyperLink
          unstyled
          data-node={key}
          key={key}
          to={toNodePath(key)}
          className={PILL_CLASS}
          ref={(node: HTMLAnchorElement | null) => {
            if (node) {
              pillsRef.current.set(key, node);
            } else {
              pillsRef.current.delete(key);
            }
          }}
        >
          <Badge
            is='span'
            variant={label.accent ? 'secondary' : 'outline'}
            /*
             * Set on the badge, not on the link around it. `Badge` declares
             * these properties on itself, and a self-declaration beats an
             * inherited one however close the ancestor - put them on the link
             * and the accent silently does nothing.
             */
            style={
              label.accent
                ? ({
                    '--kicl--components--badge--background-color': label.accent,
                    '--kicl--components--badge--color': `contrast-color(var(--kicl--components--badge--background-color))`,
                  } as React.CSSProperties)
                : undefined
            }
            /*
             * The routed taxon's own chip is a step larger, on the same signal
             * that colours its border - so the label you are actually reading
             * is distinguished by weight as well as by hue, and still reads as
             * one when the accent is hard to pick out against the tree behind
             * it.
             */
            size={label.accent ? 'large' : 'small'}
          >
            {label.text}
          </Badge>
        </HyperLink>
      ))}
    </nav>
  );
};

export { LabelProjector, Labels };
