import React from 'react';

// Libraries
import classNames from 'classnames';

// Context
import { useGlobalHeaderContext } from '@/widgets/global-header/context';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as HOME } from '@/views/experiments/home/constants';

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
      className={classNames(
        CLASS_NAME,
        'kicl-inline-size-full',
        'kicl-inset-inline-start-0',
        'kicl-position-fixed',
        {
          [`${CLASS_NAME}--under-header`]: show,
        }
      )}
    />
  );
};

export { CLASS_NAME, ScrollIndicator };
