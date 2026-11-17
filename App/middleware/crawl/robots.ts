import { ORIGIN } from './constants';
import { PRIVATE } from './pages';

const robots = (gated: boolean) => {
  if (gated) {
    return 'User-agent: *\nDisallow: /\n';
  }

  return [
    'User-agent: *',
    'Allow: /',
    ...PRIVATE.map((path) => `Disallow: ${path}`),
    '',
    `Sitemap: ${ORIGIN}/sitemap.xml`,
    '',
  ].join('\n');
};

export { robots };
