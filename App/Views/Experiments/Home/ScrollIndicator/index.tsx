import React from 'react';

// Libraries
import classNames from 'classnames';

// Styles
import './Styles.scss';

// Constants
import { CLASS_NAME as HOME } from '@/Views/Experiments/Home/constants';

const CLASS_NAME = `${HOME}__scroll-indicator`;

/** A thin bar along the top that fills with the page's scroll. Same as Pika's. */
const ScrollIndicator: React.FunctionComponent = () => (
  <div aria-hidden className={classNames(CLASS_NAME, 'kicl-position-fixed')} />
);

export { CLASS_NAME };
export default ScrollIndicator;
