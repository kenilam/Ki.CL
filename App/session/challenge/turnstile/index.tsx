import React from 'react';

// Components
import { Spinner } from 'design/components';

// Context
import { useSessionContext } from '@/session/context';

const Turnstile: React.FunctionComponent = () => {
  const { container, interactive } = useSessionContext().turnstile;

  return (
    <>
      <Spinner in={!interactive} position='inline' />
      <div ref={container} />
    </>
  );
};

export { Turnstile };
