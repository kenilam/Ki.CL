import fs from 'fs';

/**
 * The page a visitor sees after cancelling the password prompt, before its
 * words are filled in. The image is inlined as base64 because it is not in the
 * build, so there is no URL to ask for it by.
 */
const image = fs
  .readFileSync(new URL('./guard.webp', import.meta.url))
  .toString('base64');

export const page = fs
  .readFileSync(new URL('./page.html', import.meta.url), 'utf8')
  .replace('src="guard.webp"', `src="data:image/webp;base64,${image}"`);
