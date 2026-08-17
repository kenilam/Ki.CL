import React, { useEffect, useLayoutEffect, useMemo, useRef } from 'react';

import { labelWithRank } from '@/Views/Experiments/TreeOfLife/tree';

import type { LayoutNode, LayoutResult } from './layoutEngine';
import {
  TreeRenderer,
  type TreeCamera,
  type TreeRendererHandlers,
} from './treeRenderer';

const CLASS_NAME = 'kicl--views--experiments--tree-of-life--v14';

type Props = {
  layout: LayoutResult;
  viewport: { width: number; height: number };
  camera: TreeCamera;
  rootOffsetY: number;
  expandingIds: ReadonlySet<string>;
  focusIds: ReadonlySet<string> | null;
  selectedId: string | null;
  /** Click/search pin - keeps wind + growth paused after the pointer leaves. */
  pinnedId: string | null;
  labelId: string | null;
  clampScale: (scale: number) => number;
  onCameraChange: (camera: TreeCamera) => void;
  onHover: (id: string | null) => void;
  onNodeClick: (node: LayoutNode) => void;
  onBackdropClick: () => void;
  windButtonRef: React.RefObject<HTMLButtonElement | null>;
  blowGustRef: React.MutableRefObject<() => void>;
};

const TreeWebGL: React.FC<Props> = ({
  layout,
  viewport,
  camera,
  rootOffsetY,
  expandingIds,
  focusIds,
  selectedId,
  pinnedId,
  labelId,
  clampScale,
  onCameraChange,
  onHover,
  onNodeClick,
  onBackdropClick,
  windButtonRef,
  blowGustRef,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<TreeRenderer | null>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const handlers = useMemo<TreeRendererHandlers>(
    () => ({
      onHover,
      onNodeClick,
      onBackdropClick,
    }),
    [onHover, onNodeClick, onBackdropClick]
  );

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }
    const renderer = new TreeRenderer(canvas);
    rendererRef.current = renderer;
    renderer.setHandlers(handlers);
    renderer.setCameraControls({ onCameraChange, clampScale });
    renderer.setBlowingButton(windButtonRef.current);
    blowGustRef.current = () => renderer.blowGust();
    renderer.resize(viewport.width, viewport.height);
    renderer.setScene({
      layout,
      camera,
      rootOffsetY,
      expandingIds,
      focusIds,
      selectedId,
      pinnedId,
      labelId,
    });
    renderer.start();
    return () => {
      blowGustRef.current = () => {};
      renderer.dispose();
      rendererRef.current = null;
    };
  }, []);

  useEffect(() => {
    rendererRef.current?.setHandlers(handlers);
  }, [handlers]);

  useEffect(() => {
    rendererRef.current?.setCameraControls({ onCameraChange, clampScale });
  }, [onCameraChange, clampScale]);

  useEffect(() => {
    rendererRef.current?.setBlowingButton(windButtonRef.current);
  });

  useLayoutEffect(() => {
    const renderer = rendererRef.current;
    if (!renderer) {
      return;
    }
    renderer.resize(viewport.width, viewport.height);
    renderer.setScene({
      layout,
      camera,
      rootOffsetY,
      expandingIds,
      focusIds,
      selectedId,
      pinnedId,
      labelId,
    });
  }, [
    layout,
    camera,
    rootOffsetY,
    expandingIds,
    focusIds,
    selectedId,
    pinnedId,
    labelId,
    viewport.width,
    viewport.height,
  ]);

  // Keep the HTML label on the winded marker in screen space at 1rem.
  // Pick an offset that steers clear of the marker, pedicel, and incoming branch.
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const canvas = canvasRef.current;
      const label = labelRef.current;
      if (canvas && label && labelId) {
        const lx = Number(canvas.dataset.labelX);
        const ly = Number(canvas.dataset.labelY);
        const lr = Number(canvas.dataset.labelR ?? 8);
        const dirX = Number(canvas.dataset.labelDirX ?? 0);
        const dirY = Number(canvas.dataset.labelDirY ?? -1);
        const hasPedicel = canvas.dataset.labelPedicel === '1';
        const color = canvas.dataset.labelColor ?? '';
        if (Number.isFinite(lx) && Number.isFinite(ly)) {
          const canopyDeg = Number(canvas.dataset.canopyDeg ?? 0);
          const rad = (canopyDeg * Math.PI) / 180;
          const c = Math.cos(rad);
          const s = Math.sin(rad);
          const toScreen = (tx: number, ty: number): [number, number] => {
            const rx = c * tx - s * ty;
            const ry = s * tx + c * ty;
            return [
              viewport.width / 2 + rx * camera.scale + camera.x * camera.scale,
              viewport.height / 2 +
                (ry + rootOffsetY) * camera.scale +
                camera.y * camera.scale,
            ];
          };
          const [sx, sy] = toScreen(lx, ly);
          // Branch / hang direction in screen pixels (y down).
          const [bx, by] = toScreen(lx + dirX, ly + dirY);
          let bdx = bx - sx;
          let bdy = by - sy;
          const bLen = Math.hypot(bdx, bdy) || 1;
          bdx /= bLen;
          bdy /= bLen;
          // Incoming branch is opposite growth (from parent toward tip).
          const inboundX = -bdx;
          const inboundY = -bdy;

          const remPx =
            typeof window !== 'undefined'
              ? Number.parseFloat(
                  getComputedStyle(document.documentElement).fontSize
                ) || 16
              : 16;
          const clear = Math.max(lr * camera.scale, 10) + remPx * 0.55;
          const slots: Array<{ ox: number; oy: number; ax: string }> = [
            { ox: 0, oy: -1, ax: 'center' },
            { ox: 0.85, oy: -0.85, ax: 'left' },
            { ox: -0.85, oy: -0.85, ax: 'right' },
            { ox: 1, oy: 0, ax: 'left' },
            { ox: -1, oy: 0, ax: 'right' },
            { ox: 0.85, oy: 0.85, ax: 'left' },
            { ox: -0.85, oy: 0.85, ax: 'right' },
            { ox: 0, oy: 1, ax: 'center' },
          ];

          let best = slots[0]!;
          let bestScore = Number.NEGATIVE_INFINITY;
          for (let i = 0; i < slots.length; i += 1) {
            const slot = slots[i]!;
            const px = sx + slot.ox * clear;
            const py = sy + slot.oy * clear;
            // Prefer away from the incoming branch / pedicel axis.
            const alongInbound = slot.ox * inboundX + slot.oy * inboundY;
            let score = -alongInbound * 3;
            // Soft preference for above the marker (readable, clears pedicel hang).
            score += -slot.oy * (hasPedicel ? 1.4 : 0.6);
            // Prefer side seats when the branch is steeply vertical.
            score += Math.abs(slot.ox) * Math.abs(inboundY) * 0.8;
            // Keep inside the viewport with a small pad.
            const pad = remPx;
            if (px < pad || px > viewport.width - pad) {
              score -= 4;
            }
            if (py < pad || py > viewport.height - pad) {
              score -= 4;
            }
            if (score > bestScore) {
              bestScore = score;
              best = slot;
            }
          }

          const tx = sx + best.ox * clear;
          const ty = sy + best.oy * clear;
          const xAnchor =
            best.ax === 'left' ? '0%' : best.ax === 'right' ? '-100%' : '-50%';
          label.style.transform = `translate(${tx}px, ${ty}px) translate(${xAnchor}, -50%)`;
          label.style.color = color;
          label.dataset.anchor = best.ax;
          label.hidden = false;
        } else {
          label.hidden = true;
        }
      } else if (label) {
        label.hidden = true;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [labelId, camera, rootOffsetY, viewport.width, viewport.height]);

  const labeled = labelId ? layout.nodes.find((n) => n.id === labelId) : null;
  const labelText = labeled
    ? labelWithRank(labeled.node, labeled.isOrigin)
    : '';

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`${CLASS_NAME}__svg kicl-position-absolute`}
        aria-label='Tree of Life map'
      />
      <span
        ref={labelRef}
        hidden
        className={`${CLASS_NAME}__webgl-label kicl-position-absolute kicl-font-family kicl-font-weight`}
      >
        {labelText}
      </span>
    </>
  );
};

export default TreeWebGL;
