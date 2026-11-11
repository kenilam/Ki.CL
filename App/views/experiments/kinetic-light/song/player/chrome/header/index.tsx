import React from 'react';

// Components
import { BackLink, Layout } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Status } from './status';
import { Title } from './title';

// Constants
import { toPath } from '@/views/experiments/kinetic-light/constants';

const Header: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Layout autoFlow='row' gap='narrowest' justifyItems='start'>
      <header className='kicl-pointer-events-auto'>
        <BackLink
          className='kicl-margin-block-end'
          label={t('experiment', { context: 'kinetic_light' })}
          to={toPath()}
        />
        <Title />
        <Status />
      </header>
    </Layout>
  );
};

export { Header };
