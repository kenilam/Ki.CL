import { useState } from 'react';

// Context
import { useCasesContext } from '@/views/experiments/factory-arm/workspace/cases-context';

/**
 * The case that blinks as the cell loads, to show cases can be picked: a
 * case on top at the front, on the side the camera starts from.
 */
const useHint = () => {
  const { boxes } = useCasesContext();

  const [hint] = useState(() => {
    const top = ({ position, size }: (typeof boxes)[number]) =>
      position[1] + size[1] / 2;
    const highest = Math.max(...boxes.map(top));

    return boxes
      .filter((box) => top(box) > highest - 0.01)
      .toSorted(
        (a, b) => b.position[2] - a.position[2] || a.position[0] - b.position[0]
      )[0]?.id;
  });

  return hint;
};

export { useHint };
