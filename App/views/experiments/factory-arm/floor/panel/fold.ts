// Constants
import { PANEL, WIDE } from '@/views/experiments/factory-arm/floor/constants';

/** On small screens the panel covers the stage, so it folds away once something starts there. */
const fold = () => {
  if (!matchMedia(WIDE).matches) {
    document.getElementById(PANEL)?.hidePopover();
  }
};

export { fold };
