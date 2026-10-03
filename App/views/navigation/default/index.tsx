import React from 'react';

// Components
import { HyperLink, Navigation } from 'design/components';

// Views
import { PATH as EXPERIMENTS_PATH } from '@/views/experiments';

// Constants
import { LABEL } from '@/views/navigation/constants';

const CLASS_NAME = 'kicl--views--navigation--default';

const Links = [
  <HyperLink key={EXPERIMENTS_PATH} to={`/${EXPERIMENTS_PATH}`}>
    Experiments
  </HyperLink>,
];

const Default: React.FunctionComponent = () => {
  return (
    <Navigation aria-label={LABEL} autoFlow='column' className={CLASS_NAME}>
      {Links}
    </Navigation>
  );
};

export { Default };
