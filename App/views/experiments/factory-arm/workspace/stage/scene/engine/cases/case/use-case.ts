// Three
import type { Fiber } from '@/three';

// Context
import { useCasesContext } from '@/views/experiments/factory-arm/workspace/cases-context';
import { useEngineContext } from '@/views/experiments/factory-arm/workspace/stage/scene/engine/context';

// Partials
import { useGlow } from './use-glow';
import { usePlace } from './use-place';

// Constants
import { DRAG } from '@/views/experiments/factory-arm/engine/layout';

/** One case's entry, its cardboard, where it's drawn, and what a click on it asks for. */
const useCase = (id: string) => {
  const { boxes } = useCasesContext();
  const box = boxes.find((each) => {
    return each.id === id;
  })!;
  const {
    conductor: { ask, state },
  } = useEngineContext();
  const cardboard = useGlow(box);
  const { track, visual } = usePlace(box);

  const select = (event: Fiber.ThreeEvent<MouseEvent>) => {
    event.stopPropagation();

    // A drag to turn the view that ends on a case isn't a click on it.
    if (event.delta > DRAG) {
      return;
    }

    ask(box.id);
  };

  const hover = (event: Fiber.ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    document.body.style.cursor = state.world.cases[box.id]
      ? 'pointer'
      : 'default';
  };

  return { box, cardboard, hover, select, track, visual };
};

export { useCase };
