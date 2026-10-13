import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Icons
import * as Ri from 'react-icons/ri';

// Components
import { Heading, HyperLink, Layout, Text } from 'design/components';

// Styles
import './styles.scss';

// Constants
import { toPath as toExperimentsPath } from '@/views/experiments/constants';
import {
  CLASS_NAME as VIEW,
  PATH,
} from '@/views/experiments/daylight/constants';

const CLASS_NAME = `${VIEW}__words`;

/*
 * Where along the title the blue gives way to the orange, in per cent. It runs
 * past both ends, so full night leaves a trace of orange and full day a trace
 * of blue.
 */
const EDGE_START = -10;
const EDGE_SPAN = 120;

type Props = {
  /** Which way the sun is from the globe, in CSS degrees. The title's colour runs toward it. */
  bearing: number;
  /** How much of the place's light is day, from 0 to 1. That much of the title is orange. */
  day: number;
};

/** The page's header, over the drawing: the way back, the title and a line about it. */
const Words: React.FunctionComponent<Props> = ({ bearing, day }) => {
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
        <Heading
          className={classNames(`${CLASS_NAME}__title`, 'kicl-font-size-huge')}
          dense
          is='h1'
          style={
            {
              [`--${VIEW}--bearing`]: `${bearing}deg`,
              [`--${VIEW}--night`]: `${EDGE_START + (1 - day) * EDGE_SPAN}%`,
            } as React.CSSProperties
          }
        >
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
