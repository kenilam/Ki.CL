import type { Express } from 'express';

import type { Path } from './constants';
import { llms } from './llms';
import { robots } from './robots';
import { sitemap } from './sitemap';

const TEXT = 'text/plain; charset=utf-8';

const DOCUMENTS: Record<
  Path,
  { type: string; write: (gated: boolean) => string }
> = {
  '/llms.txt': { type: TEXT, write: llms },
  '/robots.txt': { type: TEXT, write: robots },
  '/sitemap.xml': { type: 'application/xml; charset=utf-8', write: sitemap },
};

const CACHE = 'public, max-age=3600';

const crawl = (path: Path, gated: boolean) => {
  const { type, write } = DOCUMENTS[path];

  return { body: write(gated), cache: CACHE, type };
};

const applyCrawl = (app: Express): void => {
  const gated = Boolean(process.env.KICL_GATE_PASSWORD);

  Object.entries(DOCUMENTS).forEach(([path, { type, write }]) => {
    app.get(path, (_request, response) => {
      response.setHeader('Cache-Control', CACHE).type(type).send(write(gated));
    });
  });
};

export { applyCrawl, crawl };
