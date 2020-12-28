import express from 'express';
import compression from 'compression';
import historyFallback from 'connect-history-api-fallback';
import hpp from 'hpp';

import security from './security';

const middleware = [
  security,
  hpp(),
  express.urlencoded({ extended: true }),
  compression(),
  historyFallback(),
];

export default middleware;
