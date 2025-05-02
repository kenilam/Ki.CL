import React, { useEffect } from 'react';

// Libraries
import { useRouteError } from 'react-router-dom';

// Components
import { Heading, Text } from '@/Components';

// Spec
import * as Spec from './Spec';

const ErrorElement: React.FunctionComponent = () => {
  const errors = useRouteError() as Spec.RouterError | Error;

  useEffect(() => {
    if (!errors) {
      return;
    }

    const root = document.querySelector('body');

    if (!root) {
      return;
    }

    root.dataset.routes = 'errors';

    if (errors instanceof Error) {
      document.title = `Loci | ${errors?.message.toUpperCase()}`;
      return;
    }

    document.title = `Loci | ${errors?.status}`;
  });

  if (!errors) {
    return null;
  }

  if (errors instanceof Error) {
    return (
      <>
        <Heading is='h1'>{`${errors?.message}`}</Heading>
        <Text>{`${errors?.stack}`}</Text>
      </>
    );
  }

  return (
    <>
      <Heading is='h1'>{`${errors?.status}: ${errors?.statusText}`}</Heading>
      <Text>{`${errors?.error}`}</Text>
    </>
  );
};

export default ErrorElement;
