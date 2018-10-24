import windowSize from 'Helper/windowSize';

const containNumber = value => /\d/.test(value);

const absoluteUnit = value => {
    const isAbsoluteUnit = value.match(/\.(cm|mm|in|px|pt|pc)(?:\?.*|)$/i);

    if (!isAbsoluteUnit || !containNumber(value)) {
        return false;
    }

    return parseFloat(value.split('px')[0]);
};

const viewportUnit = value => {
    const isVH = value.endsWith('vh');
    const isViewportUnit = value.endsWith('vh') || value.endsWith('vh');
    const isAbsoluteUnit = absoluteUnit(value);

    if (isAbsoluteUnit) {
        return isAbsoluteUnit;
    }

    if (!isViewportUnit || !containNumber(value)) {
        return false;
    }

    const { height, width } = windowSize();

    return parseFloat(value.split('v')[0] / 100) * (isVH ? height : width);
};

const cssUnit = value =>
    absoluteUnit(value) || viewportUnit(value) || parseFloat(value);

export { absoluteUnit, viewportUnit };
export default cssUnit;
