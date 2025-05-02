import React from 'react';

// Components
import { Layout, HyperLink, Navigation } from '@/Components';

// Views
import { PATH as HOME_PATH } from '@/Views/Home';

const CLASS_NAME = 'kicl--widgets--global-header--navigation--default';

const Links = [
  <HyperLink to={`/${HOME_PATH}`} key={HOME_PATH}>
    Home
  </HyperLink>,
];

const Default: React.FunctionComponent = () => {
  return (
    <Layout
      autoFlow='column'
      gap='wide'
      alignItems='center'
      justifyContent='end'
    >
      <section className={CLASS_NAME}>
        <Navigation gap='widest'>{Links}</Navigation>
      </section>
    </Layout>
  );
};

export default Default;
