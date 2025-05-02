import { KeenSliderOptions } from 'keen-slider/react';

const CLASS_NAME = 'kicl--widgets--slider';

const OPTIONS: KeenSliderOptions = {
  loop: true,
  mode: 'snap',
  renderMode: 'performance',
  slides: {
    origin: 'center',
    perView: 2,
    spacing: 16,
  },
};

export { CLASS_NAME, OPTIONS };
export default {};
