import React from 'react';

import { Layout, Text } from 'design/components';
import { useTranslation } from 'design/hooks';

import { Links } from './links';

const Byline: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Layout
      alignItems='center'
      display='flex'
      gap='narrow'
      justifyContent='center'
      wrap
    >
      <address className='kicl-padding-block-end'>
        <Text is='span' variant='secondary'>
          {t('name')}
        </Text>
        <Links />
      </address>
    </Layout>
  );
};

export { Byline };
