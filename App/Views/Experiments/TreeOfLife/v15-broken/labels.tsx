import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { Fiber } from '@/Three';

import { useNodeWorldSize } from './nodeScale';

/**
 * Labels are laid out in screen space, not parented to their node, so they
 * can be pushed clear of the visualisation. A projector inside the Canvas
 * publishes screen coordinates each frame; a DOM layer outside it seats the
 * pills against an occupancy grid.
 *
 * Everything that matters visually is an obstacle in that grid: node bodies,
 * *branch paths* (sampled from the very same curve the geometry is swept
 * along, so a label can never lie across a vein), and labels already placed.
 */

export type LabelInput = {
  key: string;
  text: string;
  position: readonly [number, number, number];
  /** Higher wins a contested seat: current > parent > ancestor > child. */
  priority: number;
  /**
   * Relative body multiplier. Multiplied by the shared world diameter and
   * projected to pixels per frame, since bodies are world-space and so their
   * screen size changes with zoom.
   */
  bodyScale: number;
  opacity: () => number;
};

/** A branch's world-space centreline, already sampled. */
export type BranchPath = ReadonlyArray<readonly [number, number, number]>;

type Projected = {
  key: string;
  text: string;
  x: number;
  y: number;
  priority: number;
  radiusPx: number;
  alpha: number;
  visible: boolean;
};

type Store = {
  projected: Projected[];
  /** Branch centrelines projected to screen space. */
  polylines: Array<Array<[number, number]>>;
  width: number;
  height: number;
};

const store: Store = { projected: [], polylines: [], width: 0, height: 0 };

/** Publishes screen positions each frame. Must live inside the Canvas. */
export const LabelProjector: React.FunctionComponent<{
  labels: readonly LabelInput[];
  branchPaths: readonly BranchPath[];
}> = ({ labels, branchPaths }) => {
  const scratch = useRef(new THREE.Vector3());
  const worldDiameter = useNodeWorldSize();

  Fiber.useFrame(({ camera, size }) => {
    store.width = size.width;
    store.height = size.height;

    const perspective = camera as THREE.PerspectiveCamera;
    const verticalFov = (perspective.fov * Math.PI) / 180;
    const projectionScale = size.height / (2 * Math.tan(verticalFov / 2));

    const out: Projected[] = [];
    labels.forEach((label) => {
      scratch.current.set(...(label.position as [number, number, number]));
      const distance = camera.position.distanceTo(scratch.current);
      scratch.current.project(camera);

      const behind = scratch.current.z > 1;
      out.push({
        key: label.key,
        text: label.text,
        x: ((scratch.current.x + 1) / 2) * size.width,
        y: ((1 - scratch.current.y) / 2) * size.height,
        priority: label.priority,
        radiusPx:
          ((worldDiameter / 2) * label.bodyScale * projectionScale) /
          Math.max(0.001, distance),
        alpha: label.opacity(),
        visible: !behind,
      });
    });
    store.projected = out;

    const lines: Array<Array<[number, number]>> = [];
    branchPaths.forEach((path) => {
      const line: Array<[number, number]> = [];
      path.forEach((point) => {
        scratch.current.set(...(point as [number, number, number]));
        scratch.current.project(camera);
        if (scratch.current.z > 1) {
          return;
        }
        line.push([
          ((scratch.current.x + 1) / 2) * size.width,
          ((1 - scratch.current.y) / 2) * size.height,
        ]);
      });
      if (line.length > 1) {
        lines.push(line);
      }
    });
    store.polylines = lines;
  });

  return null;
};

/*
 * Occupancy grid. Testing every candidate seat against every branch pixel
 * would be far too much work per frame; binning into coarse cells makes both
 * marking and querying near-constant time.
 */
const CELL_PX = 12;

type Grid = { cols: number; rows: number; bits: Uint8Array };

function createGrid(width: number, height: number): Grid {
  const cols = Math.max(1, Math.ceil(width / CELL_PX));
  const rows = Math.max(1, Math.ceil(height / CELL_PX));
  return { cols, rows, bits: new Uint8Array(cols * rows) };
}

function markRect(
  grid: Grid,
  left: number,
  top: number,
  right: number,
  bottom: number
): void {
  const c0 = Math.max(0, Math.floor(left / CELL_PX));
  const c1 = Math.min(grid.cols - 1, Math.floor(right / CELL_PX));
  const r0 = Math.max(0, Math.floor(top / CELL_PX));
  const r1 = Math.min(grid.rows - 1, Math.floor(bottom / CELL_PX));
  for (let r = r0; r <= r1; r += 1) {
    for (let c = c0; c <= c1; c += 1) {
      grid.bits[r * grid.cols + c] = 1;
    }
  }
}

/** Walk a screen-space segment, marking every cell it passes through. */
function markSegment(
  grid: Grid,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): void {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / (CELL_PX * 0.5)));
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const c = Math.floor((x1 + dx * t) / CELL_PX);
    const r = Math.floor((y1 + dy * t) / CELL_PX);
    if (c >= 0 && c < grid.cols && r >= 0 && r < grid.rows) {
      grid.bits[r * grid.cols + c] = 1;
    }
  }
}

/** How many occupied cells a rect overlaps — 0 means a clear seat. */
function rectCost(
  grid: Grid,
  left: number,
  top: number,
  right: number,
  bottom: number
): number {
  const c0 = Math.max(0, Math.floor(left / CELL_PX));
  const c1 = Math.min(grid.cols - 1, Math.floor(right / CELL_PX));
  const r0 = Math.max(0, Math.floor(top / CELL_PX));
  const r1 = Math.min(grid.rows - 1, Math.floor(bottom / CELL_PX));
  let cost = 0;
  for (let r = r0; r <= r1; r += 1) {
    for (let c = c0; c <= c1; c += 1) {
      cost += grid.bits[r * grid.cols + c]!;
    }
  }
  return cost;
}

/** Candidate seats: two rings, twelve bearings, nearest ring and above first. */
const SEAT_ANGLES = Array.from(
  { length: 12 },
  (_, i) => (i / 12) * Math.PI * 2
);
const SEAT_RINGS = [1, 1.75];

const GAP_PX = 10;
const EDGE_PAD = 12;
/** Labels this important are placed even when no seat is perfectly clear. */
const FORCE_PLACE_PRIORITY = 3;

/** Fixed chrome that labels must also stay clear of. */
const CLASS_ROOT = 'kicl--views--experiments--tree-of-life--v15';
const UI_OBSTACLE_SELECTORS = [
  `.${CLASS_ROOT}__panels`,
  `.${CLASS_ROOT}__credit`,
  `.${CLASS_ROOT}__status`,
];

/** DOM layer. Sits outside the Canvas and positions the pills each frame. */
export const LabelLayer: React.FunctionComponent = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Map<string, HTMLSpanElement>>(new Map());

  useEffect(() => {
    let raf = 0;

    const tick = () => {
      const host = hostRef.current;
      if (host && store.width) {
        const elements = nodesRef.current;
        const seen = new Set<string>();
        const grid = createGrid(store.width, store.height);

        // Node bodies are obstacles in their own right…
        store.projected.forEach((item) => {
          if (!item.visible) {
            return;
          }
          markRect(
            grid,
            item.x - item.radiusPx,
            item.y - item.radiusPx,
            item.x + item.radiusPx,
            item.y + item.radiusPx
          );
        });

        // …and so is every branch, along its actual curved path.
        store.polylines.forEach((line) => {
          for (let i = 1; i < line.length; i += 1) {
            const [x1, y1] = line[i - 1]!;
            const [x2, y2] = line[i]!;
            markSegment(grid, x1, y1, x2, y2);
          }
        });

        // …as is the fixed chrome, so a label never slides underneath the
        // search/detail panels or the credit and appears to vanish.
        UI_OBSTACLE_SELECTORS.forEach((selector) => {
          const element = document.querySelector(selector);
          if (!element) {
            return;
          }
          const rect = element.getBoundingClientRect();
          if (rect.width && rect.height) {
            markRect(grid, rect.left, rect.top, rect.right, rect.bottom);
          }
        });

        [...store.projected]
          .sort((a, b) => b.priority - a.priority)
          .forEach((item) => {
            seen.add(item.key);

            let element = elements.get(item.key);
            if (!element) {
              element = document.createElement('span');
              element.className =
                'kicl--views--experiments--tree-of-life--v15__label';
              host.appendChild(element);
              elements.set(item.key, element);
            }
            if (element.textContent !== item.text) {
              element.textContent = item.text;
            }

            if (!item.visible || item.alpha <= 0.05) {
              element.style.opacity = '0';
              return;
            }

            const width = element.offsetWidth || 80;
            const height = element.offsetHeight || 18;

            let best: { left: number; top: number; cost: number } | null = null;

            for (const ring of SEAT_RINGS) {
              for (const angle of SEAT_ANGLES) {
                const clearance = (item.radiusPx + GAP_PX) * ring;
                const cx = item.x + Math.sin(angle) * (clearance + width / 2);
                const cy = item.y - Math.cos(angle) * (clearance + height / 2);
                const left = cx - width / 2;
                const top = cy - height / 2;

                if (
                  left < EDGE_PAD ||
                  top < EDGE_PAD ||
                  left + width > store.width - EDGE_PAD ||
                  top + height > store.height - EDGE_PAD
                ) {
                  continue;
                }

                const cost = rectCost(
                  grid,
                  left,
                  top,
                  left + width,
                  top + height
                );
                if (!best || cost < best.cost) {
                  best = { left, top, cost };
                }
                if (cost === 0) {
                  break;
                }
              }
              if (best && best.cost === 0) {
                break;
              }
            }

            // A clear seat always wins. Failing that, only the important
            // labels are forced through; the rest step aside rather than
            // obscure a node or a branch.
            if (
              !best ||
              (best.cost > 0 && item.priority < FORCE_PLACE_PRIORITY)
            ) {
              element.style.opacity = '0';
              return;
            }

            markRect(
              grid,
              best.left,
              best.top,
              best.left + width,
              best.top + height
            );
            element.style.opacity = String(item.alpha);
            element.style.transform = `translate(${best.left}px, ${best.top}px)`;
          });

        elements.forEach((element, key) => {
          if (!seen.has(key)) {
            element.remove();
            elements.delete(key);
          }
        });
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className='kicl--views--experiments--tree-of-life--v15__labels kicl-position-absolute'
    />
  );
};
