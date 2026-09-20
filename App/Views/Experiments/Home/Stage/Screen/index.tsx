import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, HyperLink, ListItem, Text } from '@/Components';

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
 *
 * The item is the grid and ignores the pointer: stacked above the panel
 * below, it would block that panel's link. Only the text block takes it.
 */
const Screen: React.FunctionComponent<Props> = ({
  experiment,
  index,
  number,
  titleIs,
}) => (
  <ListItem
    alignContent='end'
    autoFlow='row'
    gap='none'
    className={classNames(
      CLASS_NAME,
      `${CLASS_NAME}--${experiment.plate}`,
      'kicl-pointer-events-none',
      'kicl-position-relative'
    )}
    style={{ '--kicl--views--experiments__home--index': index } as never}
  >
    <div
      aria-hidden
      className={classNames(`${CLASS_NAME}__plate`, 'kicl-position-absolute')}
    />
    <div
      className={classNames(`${CLASS_NAME}__words`, 'kicl-pointer-events-auto')}
    >
      <Text
        is='p'
        dense
        variant='secondary'
        className={classNames(
          `${CLASS_NAME}__label`,
          'kicl-font-size-small',
          'kicl-text-transform-uppercase'
        )}
      >
        {`No. ${number}`}
      </Text>
      <Heading
        is={titleIs}
        dense
        className={classNames(
          `${CLASS_NAME}__title`,
          'kicl-text-transform-uppercase'
        )}
      >
        {experiment.title}
      </Heading>
      <Text
        is='p'
        dense
        className={classNames(
          `${CLASS_NAME}__description`,
          'kicl-font-size-small'
        )}
      >
        {experiment.description}
      </Text>
      <HyperLink
        className={`${CLASS_NAME}__link`}
        lookLikeButton
        to={experiment.to}
      >
        {COPY.open}
      </HyperLink>
    </div>
  </ListItem>
);

export { CLASS_NAME };
export default Screen;
