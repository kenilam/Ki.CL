import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { BackLink, Heading, Layout, Text } from 'design/components';

// Styles
import './styles.scss';

// Constants
import { toPath as toExperimentsPath } from '@/views/experiments/constants';
import {
  CLASS_NAME as VIEW,
  PATH,
} from '@/views/experiments/daylight/constants';

const CLASS_NAME = `${VIEW}__words`;

/**
 * The page's header, over the drawing: the way back, the title and a line
 * about it. The title's colour reads custom properties the page sets as the
 * globe turns; see gradient.ts.
 */
const Words: React.FunctionComponent = () => {
  const { t } = useTranslation('daylight');
  const { t: common } = useTranslation();

  return (
    <Layout alignContent='start' autoFlow='row' gap='none' justifyItems='start'>
      <header
        className={classNames(
          CLASS_NAME,
          'kicl-inline-size-full',
          'kicl-margin-inline-auto',
          'kicl-max-inline-size-columns-12',
          'kicl-padding-block-start-header',
          'kicl-padding-inline-frame',
          'kicl-pointer-events-none',
          'kicl-position-relative'
        )}
      >
        <BackLink
          className='kicl-pointer-events-auto'
          label={common('experiments')}
          to={toExperimentsPath(PATH)}
        />
        <Heading
          className={classNames(`${CLASS_NAME}__title`, 'kicl-font-size-huge')}
          dense
          is='h1'
        >
          {common('experiment', { context: 'daylight' })}
        </Heading>
        <Text
          className={classNames(
            'kicl-margin-block-start-wide',
            'kicl-max-inline-size-columns-4'
          )}
          is='p'
        >
          {t('lede')}
        </Text>
      </header>
    </Layout>
  );
};

export { Words };
