import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, test } from 'node:test';

import { EXPERIMENTS, PAGES, POSTS, TOPICS } from '@/views/routes';

import { card, crawl, head } from '.';
import { PREVIEWS } from './previews';

const SHELL = readFileSync(
  new URL('../../index.html', import.meta.url),
  'utf8'
);

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
      PAGES.blog,
      ...POSTS.map(({ to }) => to),
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

  test('every page has its own title and description, with no unfilled words', () => {
    PREVIEWS.forEach(({ description, title, to }) => {
      assert.ok(title && description, to);
      assert.ok(!/\{\{|\$t\(|\*\*/.test(`${title} ${description}`), to);
    });
  });

  test("the shell's tags name the page that was asked for", () => {
    const [post] = POSTS;
    const html = head(SHELL, post.to);

    assert.ok(!html.includes('{{page.'));
    assert.match(html, /property="og:type" content="article"/);
    assert.ok(html.includes(`content="https://ki-cl.com${post.to}"`));
    assert.ok(html.includes(`content="https://ki-cl.com/og${post.to}.png"`));
  });

  test('a path inside a page gets that page’s words and card, and its own URL', () => {
    const [experiment] = EXPERIMENTS;
    const path = `${experiment.to}/anything`;
    const html = head(SHELL, path);

    assert.ok(html.includes(`content="https://ki-cl.com${path}"`));
    assert.ok(
      html.includes(`content="https://ki-cl.com/og${experiment.to}.png"`)
    );
    assert.match(html, /property="og:type" content="website"/);
  });

  test('a card is drawn for each page and for nothing else', async () => {
    const png = await card('/og.png');

    assert.equal(png?.toString('ascii', 1, 4), 'PNG');
    assert.equal(await card('/og/nothing.png'), null);
    assert.equal(await card(`/og${PAGES.experiments}/anything.png`), null);
  });
});
