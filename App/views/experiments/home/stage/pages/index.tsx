import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { PageIndicator, type PageIndicatorPage } from '@/components';

type Props = {
  pages: readonly PageIndicatorPage[];
};

const COPY = {
  label: 'Experiments',
};

/**
 * One dot per panel. Under reduced motion the panels flow and their anchors
 * all sit at the top, so the dots would lead nowhere; they are hidden then.
 */
const Pages: React.FunctionComponent<Props> = ({ pages }) => (
  <PageIndicator
    aria-label={COPY.label}
    className={classNames(
      'kicl-animation-none-reduced-motion',
      'kicl-visibility-hidden-reduced-motion'
    )}
    pages={pages}
  />
);

export { Pages };
