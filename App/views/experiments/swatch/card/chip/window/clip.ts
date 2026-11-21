// Helpers
import { CSSUnit } from 'design/helper';

const pointsAcross = (left: number, right: number, step: number) => {
  const first = Math.floor(left / step) + 1;
  const last = Math.ceil(right / step) - 1;

  return Array.from({ length: Math.max(0, last - first + 1) }, (_, index) => {
    return (last - index) * step;
  });
};

const clipOf = (paper: HTMLElement, pane: HTMLElement) => {
  const box = paper.getBoundingClientRect();
  const hole = pane.getBoundingClientRect();
  const tooth = CSSUnit({
    values: getComputedStyle(paper).getPropertyValue('--kicl-size').trim(),
  });
  const left = hole.left - box.left;
  const right = hole.right - box.left;
  const top = hole.top - box.top;
  const bottom = hole.bottom - box.top;
  const offset = left + ((right - left) % tooth) / 2;
  const depthAt = (x: number) => {
    const along = (((x - offset) % tooth) + tooth) % tooth;

    return Math.min(along, tooth - along);
  };
  const pointAt = (x: number) => {
    return `${x}px ${bottom - tooth / 2 + depthAt(x)}px`;
  };
  const foot = pointsAcross(left - offset, right - offset, tooth / 2).map(
    (x) => {
      return pointAt(x + offset);
    }
  );

  return `polygon(evenodd, 0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${[
    `${left}px ${top}px`,
    `${right}px ${top}px`,
    pointAt(right),
    ...foot,
    pointAt(left),
    `${left}px ${top}px`,
  ].join(', ')})`;
};

export { clipOf };
