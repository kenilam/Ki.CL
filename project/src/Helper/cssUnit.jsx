import units from 'units-css';

import windowSize from './windowSize';

const absoluteUnit = ({ value, unit }) => {
  const isAbsoluteUnit = ['em', 'pt', 'px', 'rem'].some(
    absUnit => unit === absUnit
  );

  if (!isAbsoluteUnit) {
    return false;
  }

  return units.convert('px', `${value}${unit}`);
};

const viewportUnit = ({ value, unit }) => {
  const isViewportUnit = ['vh', 'vw'].some(vUnit => unit === vUnit);

  if (!isViewportUnit) {
    return false;
  }

  const isVH = unit === 'vh';

  const { height, width } = windowSize();

  return parseFloat((value / 100) * (isVH ? height : width));
};

const cssUnit = value => {
  const props = units.parse(value);

  return absoluteUnit(props) || viewportUnit(props) || parseFloat(props);
};

export { absoluteUnit, viewportUnit };
export default cssUnit;
