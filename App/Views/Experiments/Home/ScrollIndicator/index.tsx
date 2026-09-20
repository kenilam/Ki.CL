import React from 'react';

// Libraries
import classNames from 'classnames';

// Context
import { useGlobalHeaderContext } from '@/Widgets/GlobalHeader/Context';

// Styles
import './Styles.scss';

// Constants
import { CLASS_NAME as HOME } from '@/Views/Experiments/Home/constants';

const CLASS_NAME = `${HOME}__scroll-indicator`;

/**
 * A thin bar that fills with the page's scroll, as in Portfolio/Pika. It
 * sits on the site header's bottom edge while the header shows and at the
 * top of the viewport while the header is hidden, so it never floats.
 */
const ScrollIndicator: React.FunctionComponent = () => {
  const { show } = useGlobalHeaderContext();

  return (
    <div
      aria-hidden
      className={classNames(CLASS_NAME, 'kicl-position-fixed', {
        [`${CLASS_NAME}--under-header`]: show,
      })}
    />
  );
};

export { CLASS_NAME };
export default ScrollIndicator;
