// @flow
import React from 'react';

import { randomId } from 'Helper';

import { Connector } from './State';

import './style.scss';

type description = string;

type Props = {
    description: Array<description>
};

const Description = ({ description }: Props) => (
    <div className='description'>
        {description.map(
            paragraphic => <p key={randomId}>{paragraphic}</p> 
        )}
    </div>
);

const Component = Connector(Description);

export default Component;
