// @flow
import React from 'react';

import { randomId } from 'Helper';

import { Connector } from './State';

import './style.scss';

type profession = string;

type Props = {
    profession: Array<profession>
};

const Profession = ({ profession }: Props) => (
    <ul className="profession">
        {profession.map(area => (
            <li key={randomId}>{area}</li>
        ))}
    </ul>
);

const Component = Connector(Profession);

export default Component;
