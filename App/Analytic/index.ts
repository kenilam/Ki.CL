import ReactGA, { GaOptions, Tracker as TrackerType } from 'react-ga';

import * as GA from './GA';
import * as Sentry from './Sentry';
import * as TagManager from './TagManager';

import onClick from './onClick';
import onFocus from './onFocus';
import onSubmit from './onSubmit';

const gaOptions: GaOptions = {
  siteSpeedSampleRate: 100,
};

const Tracker: TrackerType = {
  debug: import.meta.env.DEV,
  gaOptions,
  standardImplementation: true,
  testMode: import.meta.env.DEV,
  trackingId: import.meta.env.GA_TRACKING_CODE,
};

const init = () => {
  GA.init();
  Sentry.init();
  TagManager.init();
};

export {
  ReactGA,
  Sentry,
  TagManager,
  Tracker,
  init,
  onClick,
  onFocus,
  onSubmit,
};
export default {};
