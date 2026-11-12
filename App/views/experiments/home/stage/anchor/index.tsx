import React from 'react';

// Libraries
import classNames from 'classnames';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as HOME } from '@/views/experiments/home/constants';
import { SCREENS } from '@/views/experiments/home/stage/screens';

const CLASS_NAME = `${HOME}__stage__anchor`;

const SNAPS = CSS.supports('animation-timeline', 'scroll()');

type Props = Pick<(typeof SCREENS)[number]['experiment'], 'plate'>;

/**
 * Where a panel sits in the page's scroll. The panels are stacked inside
 * the sticky stage, so none of them is at its own scroll position; this
 * marks it, as a hash target and a snap point. Its id is the experiment's
 * route segment, so `/experiments#<id>` lands here.
 */
const Anchor: React.FunctionComponent<Props> = ({ plate }) => {
  const index = SCREENS.findIndex((screen) => {
    return screen.experiment.plate === plate;
  });

  return (
    <div
      className={classNames(
        CLASS_NAME,
        { 'kicl-scroll-snap-page': SNAPS },
        'kicl-block-size-screen',
        'kicl-inset-inline-0',
        'kicl-pointer-events-none',
        'kicl-position-absolute'
      )}
      id={plate}
      style={{ '--kicl--views--experiments__home--index': index } as never}
    />
  );
};

export { Anchor };
