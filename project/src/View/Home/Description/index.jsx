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
      paragraph => <p key={randomId}>{paragraph}</p> 
    )}
  </div>
);

const Component = Connector(Description);

export default Component;
