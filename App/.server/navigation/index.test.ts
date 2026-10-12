import assert from 'node:assert/strict';
import type { AddressInfo } from 'node:net';
import { after, before, describe, test } from 'node:test';

import express from 'express';

import { createNavigation } from './index';

const app = express();

app.use(
  createNavigation([
    (_, response) => {
      response.send('shell');
    },
  ])
);

// Stands in for the proxy, which replaces `Vary` with the service's own.
app.use((_, response) => {
  response.setHeader('Vary', 'Accept-Encoding');
  response.send('file');
});

const server = app.listen(0);

const ask = (path: string, dest?: string) => {
  const { port } = server.address() as AddressInfo;

  return fetch(`http://localhost:${port}${path}`, {
    headers: dest ? { 'Sec-Fetch-Dest': dest } : {},
  });
};

describe('navigation', () => {
  before(() => new Promise((resolve) => server.once('listening', resolve)));
  after(() => server.close());

  test('a script opened as a page gets the shell as not found', async () => {
    const response = await ask('/design/remoteEntry.js', 'document');

    assert.equal(response.status, 404);
    assert.equal(await response.text(), 'shell');
  });

  test('a script loaded by a page is sent, and varies by how it was asked for', async () => {
    const response = await ask('/design/remoteEntry.js', 'script');

    assert.equal(response.status, 200);
    assert.equal(
      response.headers.get('vary'),
      'Accept-Encoding, Sec-Fetch-Dest'
    );
  });

  test('a browser that does not say is sent the file', async () => {
    assert.equal((await ask('/assets/index-abc.css')).status, 200);
  });

  test('pages and files people open are left alone', async () => {
    for (const path of ['/portfolio', '/assets/static/resume.pdf']) {
      const response = await ask(path, 'document');

      assert.equal(response.status, 200);
      assert.equal(response.headers.get('vary'), 'Accept-Encoding');
    }
  });
});
