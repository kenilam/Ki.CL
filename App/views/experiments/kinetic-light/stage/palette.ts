// Three
import { THREE } from '@/three';

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
  const style = getComputedStyle(element);
  const probe = document
    .createElement('canvas')
    .getContext('2d', { willReadFrequently: true });

  const read = (name: string): THREE.Color => {
    if (!probe) {
      return new THREE.Color(1, 1, 1);
    }

    probe.clearRect(0, 0, 1, 1);
    probe.fillStyle = style.getPropertyValue(`${PROPERTY}--${name}`).trim();
    probe.fillRect(0, 0, 1, 1);

    const [red, green, blue] = probe.getImageData(0, 0, 1, 1).data;

    return new THREE.Color().setRGB(
      red / 255,
      green / 255,
      blue / 255,
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
