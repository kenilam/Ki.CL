import React from 'react';

// Components
import { HyperLink, Navigation } from '@/components';

// Views
import { PATH as EXPERIMENTS_PATH } from '@/views/experiments';

// Constants
import { LABEL } from '@/widgets/global-header/navigation/constants';

const CLASS_NAME = 'kicl--widgets--global-header--navigation--default';

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
