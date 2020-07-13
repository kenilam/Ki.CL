import { Props } from './spec';
import { Asynchronizer } from '@/Component';
import React, { FunctionComponent } from 'react';

const url = `${process.env.API_URL}/api/works`;

const Works: FunctionComponent<Props> = ({ children, transitionType, ...rest }) => (
  <Asynchronizer {...rest} transitionType={transitionType} awaitFor={url}>
    {children}
  </Asynchronizer>
);

export default Works;
