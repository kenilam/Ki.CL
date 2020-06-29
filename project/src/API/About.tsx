import Spec from '@/API/spec';
import { Asynchronizer } from '@/Component';
import React, { FunctionComponent } from 'react';
import { types } from '@/Component/CSSTransition/Type';

const url = `${process.env.API_URL}/api/about`;

const About: FunctionComponent<Spec.About.Props> = ({ children, ...rest }) => (
  <Asynchronizer {...rest} transitionType={types.SlideUp} awaitFor={url}>
    {children}
  </Asynchronizer>
);

export default About;
