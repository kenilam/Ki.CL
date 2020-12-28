import * as engine from 'units-css';
import { CSSUnit, Style } from '@/Helper/spec';

const DOM_DEPENDED_UNITS = ['%', 'ch', 'em', 'ex'];
const TIME_UNITS = ['s', 'ms'];
const BASE_UNIT = 'px';

const CSSUnit: CSSUnit = (prop) =>  {
  const { value, unit } = engine.parse(prop?.values || '');
  const node = document.querySelector('body');

  if (value < 0) {
    return Number(prop?.values);
  }

  if (TIME_UNITS.some((dependedUnit) => dependedUnit === unit)) {
    return unit === 's' ? value * 1000 : value;
  }

  if (!node || !prop?.values) {
    return 0;
  }

  if (DOM_DEPENDED_UNITS.some((dependedUnit) => dependedUnit === unit)) {
    return engine.convert(BASE_UNIT, prop.values, node);
  }

  return engine.convert(BASE_UNIT, value, node);
}

function CSSUnitGroup(style: Style) {
  const props: Style = {};

  Object.keys(style).forEach((name) => {
    props[name] = CSSUnit({ values: style[name]});
  });

  const { fontSize, maxFontSize } = props;

  if (maxFontSize) {
    props.fontSize = fontSize > maxFontSize ? maxFontSize : fontSize;
  }

  return props;
}

export { CSSUnitGroup };
export default CSSUnit;
