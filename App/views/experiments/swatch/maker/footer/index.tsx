import React from 'react';

// Components
import { Layout } from 'design/components';

// Partials
import { Allowance } from './allowance';
import { Generate } from './generate';
import { Privacy } from './privacy';

const Footer: React.FunctionComponent = () => {
  return (
    <>
      <Privacy />
      <Layout gap='narrower' justifyItems='end'>
        <div>
          <Allowance />
          <Generate />
        </div>
      </Layout>
    </>
  );
};

export { Footer };
