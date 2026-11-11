import React from 'react';

// Components
import { Layout, Spinner } from 'design/components';

// Context
import { useSessionContext } from '@/session/context';

const Starting: React.FunctionComponent = () => {
  const {
    turnstile: { container, interactive },
  } = useSessionContext();

  return (
    <>
      {interactive ? null : <Spinner in />}
      <Layout
        alignContent='center'
        justifyContent='center'
        justifyItems='center'
        fullScreen
      >
        <div ref={container} />
      </Layout>
    </>
  );
};

export { Starting };
