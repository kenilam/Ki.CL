import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { EXPERIMENTS, PAGES, TOPICS } from '@/views/routes';

import { crawl } from '.';

describe('crawl', () => {
  test('robots.txt lets crawlers in, keeps them off private pages and names the sitemap', () => {
    const { body } = crawl('/robots.txt', false);

    assert.match(body, /^Allow: \/$/m);
    assert.match(body, /^Disallow: \/me$/m);
    assert.match(body, /^Disallow: \/resume\/$/m);
    assert.match(body, /^Sitemap: https:\/\/ki-cl\.com\/sitemap\.xml$/m);
  });

  test('a copy behind the gate turns every crawler away', () => {
    assert.equal(
      crawl('/robots.txt', true).body,
      'User-agent: *\nDisallow: /\n'
    );
  });

  test('sitemap.xml lists every public page and no private one', () => {
    const { body } = crawl('/sitemap.xml', false);
    const public_ = [
      PAGES.resume,
      ...EXPERIMENTS.map(({ to }) => to),
      ...TOPICS.map(({ to }) => to),
    ];

    public_.forEach((path) => {
      assert.ok(body.includes(`<loc>https://ki-cl.com${path}</loc>`), path);
    });
    assert.ok(!body.includes(`ki-cl.com${PAGES.me}<`));
  });

  test('llms.txt has a title, a summary and no unfilled words', () => {
    const { body } = crawl('/llms.txt', false);

    assert.match(body, /^# .+\n\n> .+/);
    assert.ok(!/\{\{|\$t\(/.test(body), body);
  });
});
