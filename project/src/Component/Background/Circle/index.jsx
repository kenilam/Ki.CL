// @flow
import React from 'react';

import { PIXI } from 'Component/GraphicLayer';

const { Graphics } = PIXI;

const steps = 360;
const ratio = steps / (Math.PI * 2);

const draw = () => {
    Array.from(Array(steps).keys()).forEach(angle => {
        console.log(ratio * angle);
    });
};

const Circle = () => <Graphics {...{ draw }} />;

export default Circle;
