import * as engine from 'units-css';
import { Style } from '@/Helper/spec';

const DOM_DEPENDED_UNITS = ['%', 'ch', 'em', 'ex'];
const TIME_UNITS = ['s', 'ms'];
const BASE_UNIT = 'px';

function CSSUnit(values: number | string): number {
  const { value, unit } = engine.parse(values || '');

  if (value < 0) {
    return Number(values);
  }

  if (TIME_UNITS.some((dependedUnit) => dependedUnit === unit)) {
    return unit === 's' ? value * 1000 : value;
  }

  if (DOM_DEPENDED_UNITS.some((dependedUnit) => dependedUnit === unit)) {
    return engine.convert(BASE_UNIT, values, document.querySelector('body'));
  }

  return engine.convert(BASE_UNIT, value, document.querySelector('body'));
}

function CSSUnitGroup(style: Style) {
  const props: Style = {};

  Object.keys(style).forEach((name) => {
    props[name] = CSSUnit(style[name]);
  });

  const { fontSize, maxFontSize } = props;

  if (maxFontSize) {
    props.fontSize = fontSize > maxFontSize ? maxFontSize : fontSize;
  }

  return props;
}

export { CSSUnitGroup };
export default CSSUnit;
