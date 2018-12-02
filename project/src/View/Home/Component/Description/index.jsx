// @flow
import React from 'react';

import classnames from 'classnames';

import { randomId } from 'Helper';

import { Connector } from './State';

import './style.scss';

type description = string;

type Props = {
  description: Array<description>
};

const Description = ({ description }: Props) => (
  <div className={ classnames('css-transition-element', 'description') }>
    {description.map(
      paragraph => <p key={randomId}>{paragraph}</p> 
    )}
  </div>
);

const Component = Connector(Description);

export default Component;
