import React from 'react';

// Components
import { BackLink, Heading, Layout, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Allowance } from '@/views/experiments/kinetic-light/allowance';

// Constants
import { toPath as toExperimentsPath } from '@/views/experiments/constants';
import { PATH } from '@/views/experiments/kinetic-light/constants';

const Header: React.FunctionComponent = () => {
  const translations = {
    common: useTranslation(),
    kineticLight: useTranslation('kinetic-light'),
  };

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='start'>
      <header>
        <BackLink
          label={translations.common.t('experiments')}
          to={toExperimentsPath(PATH)}
        />
        <Heading dense is='h1' lookLike='display'>
          {translations.common.t('experiment', { context: 'kinetic_light' })}
        </Heading>
        <Text className='kicl-max-inline-size-columns-8' dense is='p'>
          {translations.kineticLight.t('lede')}
        </Text>
        <Allowance />
      </header>
    </Layout>
  );
};

export { Header };
