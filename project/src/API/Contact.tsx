import IApi from '@/API/spec';
import {Asynchronizer} from '@/Component';
import React, {FunctionComponent} from 'react';

const url = `${process.env.API_URL}/api/contact`;

const Contact: FunctionComponent<IApi.Contact.Props> = ({ children, params, ...rest }) => (
  <Asynchronizer {...rest} awaitFor={url} awaitForOptions={{
    method: 'POST',
    body: JSON.stringify(params)
  }} >
    {children}
  </Asynchronizer>
);

export { url };
export default Contact;
