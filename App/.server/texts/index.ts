import fs from 'fs';

/**
 * The words this server writes itself: the shell's title and description, the
 * web manifest's name, the gate's page and its plain error bodies. They are in
 * the `server` namespace with the rest of the site's writing, read from the
 * API, and a page asks for them by `{{key}}`.
 *
 * A page is never held up for them. The copy in memory answers, refreshed in
 * the background, and until the API has answered once it is the file the
 * database was seeded from.
 */

const BACKEND_URL = process.env.KICL_BACKEND_URL || 'http://localhost:3100';

const TTL_MS = 60_000;
const TIMEOUT_MS = 2000;

const QUERY =
  'query kicl_Translations($language: String!, $namespaces: [String!]!) { Translations(language: $language, namespaces: $namespaces) { field value } }';

type Texts = Record<string, string>;

const seeded: Texts = JSON.parse(
  fs.readFileSync(
    new URL('../../locales/en/server.json', import.meta.url),
    'utf8'
  )
);

const HTML: Record<string, string> = {
  '"': '&quot;',
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
};

/** For text and for attribute values in double quotes. */
const escapeHtml = (text: string) =>
  text.replace(/[&<>"]/g, (character) => HTML[character]);

/** For a value between the quotes of a JSON string. */
const escapeJson = (text: string) => JSON.stringify(text).slice(1, -1);

/**
 * @param token This server's identity for the API, where the API asks for
 * one. Vite's dev server has none and needs none.
 */
const createTexts = (token: () => string | null = () => null) => {
  let texts = seeded;
  let loadedAt = 0;
  let loading = false;

  const load = async () => {
    loading = true;

    try {
      const identity = token();

      const response = await fetch(`${BACKEND_URL}/api`, {
        body: JSON.stringify({
          operationName: 'kicl_Translations',
          query: QUERY,
          variables: { language: 'en', namespaces: ['server'] },
        }),
        headers: {
          'Content-Type': 'application/json',
          ...(identity && { Authorization: `Bearer ${identity}` }),
        },
        method: 'POST',
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });

      const { data } = (await response.json()) as {
        data?: { Translations: Array<{ field: string; value: string }> };
      };

      if (data) {
        // Over the file, so a key the database lacks still has its words.
        texts = {
          ...seeded,
          ...Object.fromEntries(
            data.Translations.map(({ field, value }) => [field, value])
          ),
        };
      }
    } catch (error) {
      console.warn(
        'Texts: the API did not answer, so the last copy stands -',
        error instanceof Error ? error.message : String(error)
      );
    } finally {
      loadedAt = Date.now();
      loading = false;
    }
  };

  const text = (key: string) => {
    if (!loading && Date.now() - loadedAt > TTL_MS) {
      void load();
    }

    return texts[key] ?? key;
  };

  /** A page with each `{{key}}` replaced by its words, escaped for where they go. */
  const fill = (page: string, escape: (text: string) => string = escapeHtml) =>
    page.replace(/\{\{(\w+)\}\}/g, (_, key: string) => escape(text(key)));

  return { fill, load, text };
};

export { createTexts, escapeJson };
export type ServerTexts = ReturnType<typeof createTexts>;
