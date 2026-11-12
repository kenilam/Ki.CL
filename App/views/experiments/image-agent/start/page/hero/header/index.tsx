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
    <Layout autoFlow='row' gap='narrow' justifyItems='start'>
      <header>
        <BackLink
          label={translations.common.t('experiments')}
          to={toExperimentsPath(PATH)}
        />
        <Heading dense is='h1' lookLike='display'>
          {translations.common.t('experiment', { context: 'image_agent' })}
        </Heading>
        <Text dense is='p'>
          {translations.imageAgent.t('description')}
        </Text>
      </header>
    </Layout>
  );
};

export { Header };
