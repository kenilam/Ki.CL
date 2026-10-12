import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { PageIndicator, type PageIndicatorPage } from 'design/components';

type Props = {
  pages: readonly PageIndicatorPage[];
};

/**
 * One dot per panel. Under reduced motion the panels flow and their anchors
 * all sit at the top, so the dots would lead nowhere; they are hidden then.
 */
const Pages: React.FunctionComponent<Props> = ({ pages }) => {
  const { t: common } = useTranslation();

  return (
    <PageIndicator
      aria-label={common('experiments')}
      className={classNames(
        'kicl-animation-none-reduced-motion',
        'kicl-visibility-hidden-reduced-motion'
      )}
      pages={pages}
    />
  );
};

export { Pages };
