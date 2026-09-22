import React from 'react';

// Libraries
import classNames from 'classnames';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as SYSTEM_DESIGN } from '@/views/portfolio/pika/system-design/constants';

const CLASS_NAME = `${SYSTEM_DESIGN}__scroll-indicator`;

/** Reading progress bar, driven by the page scroll timeline. */
const ScrollIndicator: React.FunctionComponent = () => (
  <div className={classNames(CLASS_NAME, 'kicl-position-fixed')} />
);

export { CLASS_NAME, ScrollIndicator };
