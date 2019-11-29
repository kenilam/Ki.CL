import IApi from '@/API/spec';
import React, {FunctionComponent} from 'react';
import {Asynchronizer} from '@/Component';

const api = `${process.env.API_URL}/api/about`;

const About: FunctionComponent<IApi.Props<IApi.AboutData>> = ({ children }) => (
  <Asynchronizer awaitFor={api}>
    {(data) => children(data)}
  </Asynchronizer>
);

export default About;
