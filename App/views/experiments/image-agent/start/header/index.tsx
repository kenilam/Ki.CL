import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { BackLink, Heading, Layout, Text } from 'design/components';

// Constants
import { toPath as toExperimentsPath } from '@/views/experiments/constants';
import { PATH } from '@/views/experiments/image-agent/constants';

/** The start page's title and a line about it. */
const Header: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');
  const { t: common } = useTranslation();

  return (
    <Layout autoFlow='row' gap='none' justifyItems='start'>
      <header className='kicl-inline-size-columns-6'>
        <BackLink
          className='kicl-margin-block-end'
          label={common('experiments')}
          to={toExperimentsPath(PATH)}
        />
        <Heading is='h1' dense className='kicl-font-size-huge'>
          {common('experiment', { context: 'image_agent' })}
        </Heading>
        <Text className='kicl-margin-block-start-wide' dense is='p'>
          {t('description')}
        </Text>
      </header>
    </Layout>
  );
};

export { Header };
