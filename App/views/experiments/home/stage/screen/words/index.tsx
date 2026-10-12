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

const CLASS_NAME = `${SCREEN}__words`;

/** The text block. The only part of the panel that takes the pointer. */
const Words: React.FunctionComponent = () => {
  const { t } = useTranslation('experiments');
  const { t: common } = useTranslation();
  const { experiment, number } = useScreenContext();
  const title = common('experiment', { context: experiment.context });

  return (
    // Rows packed at the end: every block is as tall as the tallest, so a shorter one would spread otherwise.
    <Layout alignContent='end' autoFlow='row' gap='narrow' justifyItems='start'>
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
          {t('number', { number })}
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
        <Text
          is='p'
          dense
          className={classNames(
            'kicl-font-size-small',
            'kicl-max-inline-size-columns-5'
          )}
        >
          {t('description', { context: experiment.context })}
        </Text>
        <HyperLink
          className='kicl-margin-block-start-narrow'
          level={experiment.level}
          lookLikeButton
          size='small'
          to={experiment.to}
        >
          {common('action', { context: 'see_experience' })}
          <Text is='span' className='kicl-hidden'>
            {t('action', { context: 'open_title', title })}
          </Text>
        </HyperLink>
      </article>
    </Layout>
  );
};

export { CLASS_NAME, Words };
