import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { Heading, HyperLink, Layout, Text } from 'design/components';

// Context
import { useScreenContext } from '../context';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as SCREEN } from '../constants';
import { SCENES } from '@/views/experiments/music-visualiser/groups/types/track/visualiser/spec';

const CLASS_NAME = `${SCREEN}__words`;

/** The text block. The only part of the panel that takes the pointer. */
const Words: React.FunctionComponent = () => {
  const translations = {
    common: useTranslation(),
    experiments: useTranslation('experiments'),
  };
  const { experiment, number } = useScreenContext();
  const title = translations.common.t('experiment', {
    context: experiment.context,
  });

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='start'>
      <article
        className={classNames(
          CLASS_NAME,
          'kicl-animation-none-reduced-motion',
          'kicl-padding-block-extreme',
          'kicl-padding-inline-frame-columns-12',
          'kicl-pointer-events-auto',
          'kicl-position-relative',
          'kicl-z-index-raised'
        )}
      >
        <Text
          is='p'
          dense
          variant='secondary'
          className={classNames(
            'kicl-font-size-small',
            'kicl-letter-spacing',
            'kicl-text-transform-uppercase'
          )}
        >
          {translations.experiments.t('number', { number })}
        </Text>
        <Heading
          dense
          className={classNames(
            'kicl-font-size-huge',
            'kicl-line-height-narrower'
          )}
          is='h2'
        >
          {title}
        </Heading>
        <Text is='p' dense className='kicl-max-inline-size-columns-5'>
          {translations.experiments.t('description', {
            context: experiment.context,
            scenes: SCENES.length,
          })}
        </Text>
        <HyperLink
          className='kicl-margin-block-start-narrow'
          level={experiment.level}
          lookLikeButton
          size='small'
          to={experiment.to}
        >
          {translations.common.t('action', { context: 'see_experience' })}
          <Text is='span' className='kicl-hidden'>
            {translations.experiments.t('action', {
              context: 'open_title',
              title,
            })}
          </Text>
        </HyperLink>
      </article>
    </Layout>
  );
};

export { CLASS_NAME, Words };
