import { Config, Props } from './spec';
import { Asynchronizer } from '@/Component';
import React, { FunctionComponent } from 'react';

const url = `${process.env.API_URL}/api/contact`;

const Config: FunctionComponent<Config['Props']> = ({
  children,
  ...rest
}) => (
  <Asynchronizer {...rest} awaitFor={`${url}/config`}>
    {children}
  </Asynchronizer>
);

const Contact: FunctionComponent<Props> = ({
  children,
  params,
  ...rest
}) => {
  const awaitForOptions = {
    method: 'POST',
    body: JSON.stringify(params),
  };

  return (
    <Asynchronizer {...rest} awaitFor={url} awaitForOptions={awaitForOptions}>
      {children}
    </Asynchronizer>
  );
};

export { url, Config };
export default Contact;
