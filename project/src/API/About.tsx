import IApi from '@/API/spec';
import {Asynchronizer} from '@/Component';
import React, {FunctionComponent} from 'react';

const api = `${process.env.API_URL}/api/about`;

const About: FunctionComponent<IApi.Props<IApi.AboutData>> = ({children}) => (
  <Asynchronizer awaitFor={api}>
    {(data) => children(data)}
  </Asynchronizer>
);

export default About;
