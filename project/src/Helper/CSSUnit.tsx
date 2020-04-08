import * as engine from 'units-css';
import IHelper from './spec';

const DOM_DEPENDED_UNITS = ['%', 'ch', 'em', 'ex'];
const TIME_UNITS = ['s', 'ms'];
const BASE_UNIT = 'px';

function CSSUnit(values: any): any {
  const { value, unit } = engine.parse(values || '');

  if (value < 0) {
    return values;
  }

  if (TIME_UNITS.some((dependedUnit) => dependedUnit === unit)) {
    return unit === 's' ? value * 1000 : value;
  }

  if (DOM_DEPENDED_UNITS.some((dependedUnit) => dependedUnit === unit)) {
    return engine.convert(BASE_UNIT, values, document.querySelector('body'));
  }

  return engine.convert(BASE_UNIT, value, document.querySelector('body'));
}

function CSSUnitGroup(style: IHelper.Style) {
  const props: IHelper.Style = {};

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
