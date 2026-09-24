import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, HyperLink, Layout, Text } from '@/components';

// Context
import { useScreenContext } from '../context';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as SCREEN } from '../constants';

const CLASS_NAME = `${SCREEN}__words`;

const COPY = {
  open: 'See the experience',
};

/** The text block. The only part of the panel that takes the pointer. */
const Words: React.FunctionComponent = () => {
  const { experiment, number } = useScreenContext();

  return (
    // Rows packed at the end: every block is as tall as the tallest, so a shorter one would spread otherwise.
    <Layout alignContent='end' autoFlow='row' gap='narrow' justifyItems='start'>
      <div
        className={classNames(
          CLASS_NAME,
          'kicl-padding-block-extreme',
          'kicl-pointer-events-auto'
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
          {`No. ${number}`}
        </Text>
        <Heading
          dense
          className={classNames(
            'kicl-font-size-huge',
            'kicl-line-height-narrower'
          )}
          is='h2'
        >
          {experiment.title}
        </Heading>
        <Text
          is='p'
          dense
          className={classNames(
            `${CLASS_NAME}__description`,
            'kicl-font-size-small',
            'kicl-max-inline-size-columns-5'
          )}
        >
          {experiment.description}
        </Text>
        <HyperLink
          className='kicl-margin-block-start-narrow'
          lookLikeButton
          size='small'
          to={experiment.to}
        >
          {COPY.open}
          <Text is='span' className='kicl-hidden'>
            {`: ${experiment.title}`}
          </Text>
        </HyperLink>
      </div>
    </Layout>
  );
};

export { CLASS_NAME, Words };
