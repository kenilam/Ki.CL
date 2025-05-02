import ReactGA, {
  EventArgs,
  GaOptions,
  Tracker as TrackerType,
} from 'react-ga';

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
  ReactGA.initialize([Tracker]);
  ReactGA.pageview(`${window.location.pathname}${window.location.search}`);
};

const { event } = ReactGA;

export { type EventArgs, Tracker, event, init };
export default {};
