// Three
import { THREE } from '@/three';

// Helpers
import { readColor } from 'design/helper';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/kinetic-light/constants';

type Palette = {
  ink: THREE.Color;
  paper: THREE.Color;
  ramp: THREE.Color[];
};

const PROPERTY = `--${VIEW}__stage`;
const RAMP = 10;

const readPalette = (element: Element): Palette => {
  const read = (name: string): THREE.Color => {
    const color = readColor(element, `${PROPERTY}--${name}`);

    if (!color) {
      return new THREE.Color(1, 1, 1);
    }

    return new THREE.Color().setRGB(
      color.red / 255,
      color.green / 255,
      color.blue / 255,
      THREE.SRGBColorSpace
    );
  };

  return {
    ink: read('ink'),
    paper: read('paper'),
    ramp: Array.from({ length: RAMP }, (_, index) => read(`ramp-${index + 1}`)),
  };
};

const shade = (
  { ramp }: Palette,
  position: number,
  target: THREE.Color
): THREE.Color => {
  const wrapped = (((position % 1) + 1) % 1) * ramp.length;
  const from = Math.floor(wrapped) % ramp.length;
  const to = (from + 1) % ramp.length;

  return target.lerpColors(ramp[from], ramp[to], wrapped - Math.floor(wrapped));
};

export { readPalette, shade, type Palette };
