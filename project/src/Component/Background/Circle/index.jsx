// @flow
import React from 'react';

import { randomId } from 'Helper';

import Particle, { rgb, size } from './Particle';

type Props = {
    height: number,
    width: number
};

const count = 200;

const particleHolder = Array.from(Array(count).keys()).map(() => ({
    color: rgb(),
    size: size()
}));

const ratio = count / (Math.PI * 2);

const Circle = ({ height, width }: Props) =>
    Array.from(Array(count).keys()).map((value, index) => (
        <Particle
            {...{
                key: randomId,
                height,
                index,
                ratio,
                width,
                ...particleHolder[index]
            }}
        />
    ));

export { count };
export default Circle;
