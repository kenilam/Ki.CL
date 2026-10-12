import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Icons
import * as Ri from 'react-icons/ri';

// Components
import { Heading, HyperLink, Layout, Text } from 'design/components';

// Constants
import { toPath as toExperimentsPath } from '@/views/experiments/constants';
import { PATH } from '@/views/experiments/image-agent/constants';

/** The start page's title and a line about it. */
const Header: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');
  const { t: common } = useTranslation();

  return (
    <Layout autoFlow='row' gap='narrower' justifyItems='start'>
      <header className='kicl-inline-size-columns-6'>
        <HyperLink
          before={<Ri.RiArrowLeftSFill aria-hidden />}
          to={toExperimentsPath(PATH)}
        >
          {common('experiments')}
        </HyperLink>
        <Heading is='h1' dense className='kicl-font-size-huge'>
          {common('experiment', { context: 'image_agent' })}
        </Heading>
        <Text dense is='p' className='kicl-font-size-medium'>
          {t('description')}
        </Text>
      </header>
    </Layout>
  );
};

export { Header };
