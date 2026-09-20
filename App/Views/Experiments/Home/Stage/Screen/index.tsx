import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout, ListItem } from '@/Components';

// Partials
import Words from '@/Views/Experiments/Home/Words';

// Styles
import './Styles.scss';

// Constants
import {
  CLASS_NAME as HOME,
  type Experiment,
} from '@/Views/Experiments/Home/constants';

const CLASS_NAME = `${HOME}__screen`;

const COPY = {
  open: 'See the experience',
};

type Props = {
  experiment: Experiment;
  /** Position in the stage, from the top. Sets the scroll ranges. */
  index: number;
  number: number;
  titleIs: 'h1' | 'h2';
};

/**
 * One full-screen panel: a background that fades in and drifts, and a
 * text block that rides in from below, holds, and is pushed off by the
 * next panel's block. All of it is scroll-driven CSS; see Styles.scss.
 */
const Screen: React.FunctionComponent<Props> = ({
  experiment,
  index,
  number,
  titleIs,
}) => (
  <ListItem
    className={classNames(
      CLASS_NAME,
      `${CLASS_NAME}--${experiment.plate}`,
      'kicl-position-relative'
    )}
    style={{ '--kicl--views--experiments__home--index': index } as never}
  >
    <div
      aria-hidden
      className={classNames(`${CLASS_NAME}__plate`, 'kicl-position-absolute')}
    />
    <Layout alignContent='end' autoFlow='row' gap='none'>
      {/* Ignores the pointer: stacked above the panel below, it would block that panel's link. */}
      <div
        className={classNames(
          `${CLASS_NAME}__body`,
          'kicl-pointer-events-none',
          'kicl-position-relative'
        )}
      >
        <Words
          description={experiment.description}
          label={`No. ${number}`}
          link={{ label: COPY.open, to: experiment.to }}
          title={experiment.title}
          titleIs={titleIs}
        />
      </div>
    </Layout>
  </ListItem>
);

export { CLASS_NAME };
export default Screen;
