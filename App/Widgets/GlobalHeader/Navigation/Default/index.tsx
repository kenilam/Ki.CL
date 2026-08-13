import React from 'react';

// Components
import { HyperLink, Navigation } from '@/Components';

// Views
import { PATH as EXPERIMENTS_PATH } from '@/Views/Experiments';

const CLASS_NAME = 'kicl--widgets--global-header--navigation--default';

const Links = [
  <HyperLink key={EXPERIMENTS_PATH} to={`/${EXPERIMENTS_PATH}`}>
    Experiments
  </HyperLink>,
];

const Default: React.FunctionComponent = () => {
  return (
    <Navigation autoFlow='column' className={CLASS_NAME}>
      {Links}
    </Navigation>
  );
};

export default Default;
