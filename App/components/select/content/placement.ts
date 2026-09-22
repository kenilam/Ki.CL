import React, { useLayoutEffect, useState } from 'react';

// Constants
import { CLASS_NAME as SELECT } from '@/components/select/constants';

type ContentPlacement = {
  left: number;
  maxHeight: number;
  side: 'bottom' | 'top';
  top?: number;
  bottom?: number;
  width: number;
};

const readGap = () => {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--kicl-gutter-narrowest')
    .trim();
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? value : 4;
};

const readMaxBlockSize = (node: HTMLElement) => {
  const raw = getComputedStyle(node).maxBlockSize;
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? value : 256;
};

/** Places the fixed list under the trigger, or above it when there is more room there. */
export const usePlacement = (
  nodeRef: React.RefObject<HTMLDivElement | null>,
  open: boolean,
  children: React.ReactNode
) => {
  const [placement, setPlacement] = useState<ContentPlacement | null>(null);

  useLayoutEffect(() => {
    if (!open) {
      setPlacement(null);
      return undefined;
    }

    const update = () => {
      const content = nodeRef.current;
      if (!content) {
        return;
      }

      const root = content.closest(`.${SELECT}`);
      const trigger = root?.querySelector<HTMLElement>(
        `[data-slot='select-trigger']`
      );
      if (!trigger) {
        return;
      }

      const rect = trigger.getBoundingClientRect();
      const gap = readGap();
      const maxBlock = readMaxBlockSize(content);
      const spaceBelow = window.innerHeight - rect.bottom - gap;
      const spaceAbove = rect.top - gap;
      const desired = Math.min(maxBlock, content.scrollHeight || maxBlock);
      const side: ContentPlacement['side'] =
        spaceBelow < desired && spaceAbove > spaceBelow ? 'top' : 'bottom';
      const available = side === 'bottom' ? spaceBelow : spaceAbove;

      setPlacement({
        side,
        left: rect.left,
        width: rect.width,
        maxHeight: Math.max(0, Math.min(maxBlock, available)),
        ...(side === 'bottom'
          ? { top: rect.bottom + gap, bottom: undefined }
          : { top: undefined, bottom: window.innerHeight - rect.top + gap }),
      });
    };

    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [children, nodeRef, open]);

  return placement;
};
