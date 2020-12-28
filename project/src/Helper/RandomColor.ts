import Color from 'color';
import * as Spec from './spec';

const RandomColor: Spec.RandomColor = (prop) => {
  if (prop?.hex) {
    return Color(prop.hex);
  }

  const hex = Math.floor(Math.random() * 16777215).toString(16);

  if (hex.length < 6) {
    return RandomColor({ hex });
  }

  return Color(`#${hex}`);
}

export default RandomColor;
