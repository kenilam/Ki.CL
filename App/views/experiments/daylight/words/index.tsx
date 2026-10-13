import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Icons
import * as Ri from 'react-icons/ri';

// Components
import { Heading, HyperLink, Layout, Text } from 'design/components';

// Constants
import { toPath as toExperimentsPath } from '@/views/experiments/constants';
import {
  CLASS_NAME as VIEW,
  PATH,
} from '@/views/experiments/daylight/constants';

const CLASS_NAME = `${VIEW}__words`;

/** The page's header, over the drawing: the way back, the title and a line about it. */
const Words: React.FunctionComponent = () => {
  const { t } = useTranslation('daylight');
  const { t: common } = useTranslation();

  return (
    <Layout
      alignContent='start'
      autoFlow='row'
      gap='narrow'
      justifyItems='start'
    >
      <header
        className={classNames(
          CLASS_NAME,
          'kicl-color-white',
          'kicl-inline-size-full',
          'kicl-margin-inline-auto',
          'kicl-max-inline-size-columns-12',
          'kicl-padding-block-start-header',
          'kicl-padding-inline-frame',
          'kicl-pointer-events-none',
          'kicl-position-relative'
        )}
      >
        <HyperLink
          before={<Ri.RiArrowLeftSFill aria-hidden />}
          className='kicl-pointer-events-auto'
          to={toExperimentsPath(PATH)}
        >
          {common('experiments')}
        </HyperLink>
        <Heading className='kicl-font-size-huge' dense is='h1'>
          {common('experiment', { context: 'daylight' })}
        </Heading>
        <Text className='kicl-max-inline-size-columns-4' is='p'>
          {t('lede')}
        </Text>
      </header>
    </Layout>
  );
};

export { Words };
