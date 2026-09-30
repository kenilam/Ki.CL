import fs from 'fs';

/**
 * The page a visitor sees after cancelling the password prompt. The image is
 * inlined as base64 because the gate blocks every other request, so a separate
 * image URL would itself get a 401.
 */
const image = fs
  .readFileSync(new URL('./guard.webp', import.meta.url))
  .toString('base64');

export const page = fs
  .readFileSync(new URL('./page.html', import.meta.url), 'utf8')
  .replace('src="guard.webp"', `src="data:image/webp;base64,${image}"`);
