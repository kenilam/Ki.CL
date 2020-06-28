import Spec from '@/API/spec';
import { Asynchronizer } from '@/Components';
import React, { FunctionComponent } from 'react';

const url = `${process.env.API_URL}/api/about`;

const About: FunctionComponent<Spec.About.Props> = ({ children, ...rest }) => (
  <Asynchronizer {...rest} awaitFor={url}>
    {children}
  </Asynchronizer>
);

export default About;
