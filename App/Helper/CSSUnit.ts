import * as engine from 'units-css';
import { CSSUnit as CSSUnitType, Style } from '^/App/Helper/_Spec';

const DOM_DEPENDED_UNITS = ['%', 'ch', 'em', 'ex'];
const TIME_UNITS = ['s', 'ms'];
const BASE_UNIT = 'px';

const CSSUnit: CSSUnitType = (prop) => {
  const { value, unit } = engine.parse(prop?.values || '');

  if (value < 0) {
    return Number(prop?.values);
  }

  if (unit === BASE_UNIT) {
    return value;
  }

  if (TIME_UNITS.some((dependedUnit) => dependedUnit === unit)) {
    return unit === 's' ? value * 1000 : value;
  }

  if (!document.body || !prop?.values) {
    return 0;
  }

  if (DOM_DEPENDED_UNITS.some((dependedUnit) => dependedUnit === unit)) {
    return engine.convert(BASE_UNIT, prop.values, document.body);
  }

  return engine.convert(BASE_UNIT, value, document.body);
};

const CSSUnitGroup = (style: Style) => {
  const props: Style = {};

  Object.keys(style).forEach((name) => {
    props[name] = CSSUnit({ values: style[name] });
  });

  const { fontSize, maxFontSize } = props;

  if (maxFontSize) {
    props.fontSize = fontSize > maxFontSize ? maxFontSize : fontSize;
  }

  return props;
};

export { CSSUnitGroup };
export default CSSUnit;
