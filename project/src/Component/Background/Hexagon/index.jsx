// @flow
import React from 'react';

import { randomId } from 'Helper';

import Particle from './Particle';

type Props = {
    height: number,
    width: number
};

const count = 3;

const ratio = count / (Math.PI * 2);

const Circle = ({ height, width }: Props) =>
    Array.from(Array(count).keys()).map((value, index) => (
        <Particle
            {...{
                key: randomId,
                height,
                index,
                ratio,
                width
            }}
        />
    ));

export { count };
export default Circle;
