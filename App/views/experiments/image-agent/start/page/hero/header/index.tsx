import React from 'react';

// Components
import { BackLink, Heading, Layout, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { toPath as toExperimentsPath } from '@/views/experiments/constants';
import { PATH } from '@/views/experiments/image-agent/constants';

/** The start page's title and a line about it. */
const Header: React.FunctionComponent = () => {
  const translations = {
    common: useTranslation(),
    imageAgent: useTranslation('image-agent'),
  };

  return (
    <Layout autoFlow='row' gap='none' justifyItems='start'>
      <header className='kicl-inline-size-columns-6'>
        <BackLink
          className='kicl-margin-block-end'
          label={translations.common.t('experiments')}
          to={toExperimentsPath(PATH)}
        />
        <Heading is='h1' dense className='kicl-font-size-huge'>
          {translations.common.t('experiment', { context: 'image_agent' })}
        </Heading>
        <Text className='kicl-margin-block-start-wide' dense is='p'>
          {translations.imageAgent.t('description')}
        </Text>
      </header>
    </Layout>
  );
};

export { Header };
