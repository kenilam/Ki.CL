import IApi from '@/API/spec';
import { Asynchronizer } from '@/Component';
import React, { FunctionComponent } from 'react';

const url = `${process.env.API_URL}/api/contact/config`;

const ContactConfig: FunctionComponent<IApi.ContactConfig.Props> = ({
  children,
  ...rest
}) => (
  <Asynchronizer {...rest} awaitFor={url}>
    {children}
  </Asynchronizer>
);

export { url };
export default ContactConfig;
