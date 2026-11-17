import type { Fiber } from '@/three';

import { GRID, SIDES } from './constants';

const EDGES = { ltr: 'right', rtl: 'left' } as const;

const SIZE = 3;

const GAP = 0.25;

const RAISE = 0.25;

const toText = (element: HTMLElement) => {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  const box = {
    bottom: -Infinity,
    left: Infinity,
    right: -Infinity,
    top: Infinity,
  };

  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    range.selectNodeContents(node);

    const rect = range.getBoundingClientRect();

    if (rect.width > 1) {
      box.bottom = Math.max(box.bottom, rect.bottom);
      box.left = Math.min(box.left, rect.left);
      box.right = Math.max(box.right, rect.right);
      box.top = Math.min(box.top, rect.top);
    }
  }

  return { ...box, height: box.bottom - box.top };
};

const beside = (
  element: HTMLElement,
  { width }: Fiber.RootState['viewport'],
  screen: Fiber.RootState['size'],
  dir: keyof typeof SIDES
) => {
  const name = toText(element);
  const unit = width / screen.width;
  const side = SIDES[dir];
  const edge = name[EDGES[dir]];
  const gap = name.height * GAP;
  const room = screen.width / 2 - side * (edge - screen.width / 2) - gap * 2;
  const size = Math.max(name.height * 2, Math.min(name.height * SIZE, room));
  const centre = {
    x: edge + side * (gap + size / 2),
    y: name.top - name.height * RAISE + size / 2,
  };

  return {
    scale: (size * unit) / GRID,
    x: (centre.x - screen.width / 2) * unit,
    y: (screen.height / 2 - centre.y) * unit,
  };
};

export { beside };
