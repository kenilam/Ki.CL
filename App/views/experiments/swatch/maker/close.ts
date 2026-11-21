// Constants
import { MAKER } from '@/views/experiments/swatch/constants';

const closeMaker = () => {
  const sheet = document.querySelector<HTMLDialogElement>(`#${MAKER}`);

  if (sheet?.open) {
    sheet.close();

    return;
  }

  sheet?.hidePopover();
};

export { closeMaker };
