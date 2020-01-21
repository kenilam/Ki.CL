import IApi from '@/API/spec';
import {Asynchronizer} from '@/Component';
import React, {FunctionComponent} from 'react';

const url = `${process.env.API_URL}/api/about`;

const About: FunctionComponent<IApi.About.Props> = ({children, ...rest}) => (
  <Asynchronizer {...rest} awaitFor={url}>
    {children}
  </Asynchronizer>
);

export default About;
