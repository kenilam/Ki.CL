import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { BackLink, Heading, Layout, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

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
 * globe turns; see globe/gradient.ts.
 */
const Words: React.FunctionComponent = () => {
  const translations = {
    common: useTranslation(),
    daylight: useTranslation('daylight'),
  };

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
          'kicl-inline-size-full',
          'kicl-margin-inline-auto',
          'kicl-max-inline-size-columns-12',
          'kicl-padding-block-frame',
          'kicl-padding-inline-frame',
          'kicl-pointer-events-none',
          'kicl-position-relative'
        )}
      >
        <BackLink
          className='kicl-pointer-events-auto'
          label={translations.common.t('experiments')}
          to={toExperimentsPath(PATH)}
        />
        <Heading
          className={classNames(
            `${CLASS_NAME}__title`,
            'kicl-background-clip-text'
          )}
          dense
          is='h1'
          lookLike='display'
        >
          {translations.common.t('experiment', { context: 'daylight' })}
        </Heading>
        <Text className='kicl-max-inline-size-columns-4' is='p'>
          {translations.daylight.t('lede')}
        </Text>
      </header>
    </Layout>
  );
};

export { Words };
