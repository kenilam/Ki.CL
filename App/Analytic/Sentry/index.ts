import * as Sentry from '@sentry/react';

const init = () => {
  Sentry.init({
    dsn: import.meta.env.SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
};

const { captureEvent, withProfiler } = Sentry;

type Event = Sentry.Event;

export { type Event, captureEvent, init, withProfiler };
export default {};
