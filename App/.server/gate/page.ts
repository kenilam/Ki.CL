import fs from 'fs';

/**
 * The page a visitor sees after cancelling the password prompt, or on opening
 * a script in a tab (see `navigation`), before its words are filled in. The
 * image is inlined as base64 because it is not in the build, so there is no
 * URL to ask for it by.
 */
const image = fs
  .readFileSync(new URL('./guard.webp', import.meta.url))
  .toString('base64');

const html = fs
  .readFileSync(new URL('./page.html', import.meta.url), 'utf8')
  .replace('src="guard.webp"', `src="data:image/webp;base64,${image}"`);

const HREF = { 401: '', 403: '/' } as const;

/** The page under the status it is sent with, which it shows as its heading. */
export const page = (status: 401 | 403) =>
  html
    .replaceAll('{{status}}', String(status))
    .replace('{{href}}', HREF[status]);
