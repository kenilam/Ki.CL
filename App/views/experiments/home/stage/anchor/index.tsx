import React from 'react';

// Libraries
import classNames from 'classnames';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as HOME } from '@/views/experiments/home/constants';

const CLASS_NAME = `${HOME}__stage__anchor`;

type Props = {
  /** The experiment's route segment; `/experiments#<id>` lands here. */
  id: string;
  /** Position in the stage, from the top. */
  index: number;
};

/**
 * Where a panel sits in the page's scroll. The panels are stacked inside
 * the sticky stage, so none of them is at its own scroll position; this
 * marks it, as a hash target and a snap point.
 */
const Anchor: React.FunctionComponent<Props> = ({ id, index }) => (
  <div
    className={classNames(
      CLASS_NAME,
      'kicl-inset-inline-start-0',
      'kicl-position-absolute'
    )}
    id={id}
    style={{ '--kicl--views--experiments__home--index': index } as never}
  />
);

export { Anchor, CLASS_NAME };
