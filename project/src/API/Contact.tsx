import Spec from '@/API/spec';
import { Asynchronizer } from '@/Component';
import React, { FunctionComponent } from 'react';

const url = `${process.env.API_URL}/api/contact`;

const Config: FunctionComponent<Spec.ContactConfig.Props> = ({
  children,
  ...rest
}) => (
  <Asynchronizer {...rest} awaitFor={`${url}/config`}>
    {children}
  </Asynchronizer>
);

const Contact: FunctionComponent<Spec.Contact.Props> = ({
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
