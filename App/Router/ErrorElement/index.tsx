import React, { useEffect } from 'react';

// Libraries
import { useRouteError } from 'react-router-dom';

// Components
import { Heading, Paragraph } from '@/Components';

// Spec
import * as Spec from './spec';

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
      document.title = `Ki.CL | ${errors?.message.toUpperCase()}`;
      return;
    }

    document.title = `Ki.CL | ${errors?.status}`;
  });

  if (!errors) {
    return null;
  }

  if (errors instanceof Error) {
    return (
      <>
        <Heading is='h1'>{`${errors?.message}`}</Heading>
        <Paragraph>{`${errors?.stack}`}</Paragraph>
      </>
    );
  }

  return (
    <>
      <Heading is='h1'>{`${errors?.status}: ${errors?.statusText}`}</Heading>
      <Paragraph>{`${errors?.error}`}</Paragraph>
    </>
  );
};

export default ErrorElement;
