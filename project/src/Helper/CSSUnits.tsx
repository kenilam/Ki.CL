import engine from 'units-css';

const DOM_DEPENDED_UNITS = ['%', 'ch', 'em', 'ex'];
const BASE_UNIT = 'px';

function CSSUnits(values: any): any {
  let {value, unit} = engine.parse(values);
  
  if (!value) {
    return values;
  }
  
  if (DOM_DEPENDED_UNITS.some(dependedUnit => dependedUnit === unit)) {
    return engine.convert(BASE_UNIT, values, document.querySelector('body'));
  }
  
  return engine.convert(BASE_UNIT, values);
}

export default CSSUnits;
