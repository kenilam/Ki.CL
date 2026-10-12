import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { Heading, Layout, Text } from 'design/components';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as HOME } from '@/views/experiments/home/constants';

// Partials
import { Actions } from './actions';

const CLASS_NAME = `${HOME}__more`;

/** The closing screen, in normal flow after the stage, content centred. One element: the grid is the section. */
const More: React.FunctionComponent = () => {
  const { t } = useTranslation('experiments');
  const titleId = useId();

  return (
    <Layout
      alignContent='center'
      autoFlow='row'
      gap='narrow'
      justifyItems='start'
    >
      <section
        aria-labelledby={titleId}
        className={classNames(
          CLASS_NAME,
          'kicl-animation-none-reduced-motion',
          'kicl-block-size-screen',
          'kicl-padding-block-extreme',
          'kicl-padding-inline-frame-columns-12'
        )}
      >
        <Heading
          is='h2'
          dense
          className={classNames(
            'kicl-font-size-huge',
            'kicl-line-height-narrower'
          )}
          id={titleId}
        >
          {t('title', { context: 'more' })}
        </Heading>
        <Text className='kicl-text-align-center'>
          {t('message', { context: 'more' })}
        </Text>
        <Actions />
      </section>
    </Layout>
  );
};

export { CLASS_NAME, More };
