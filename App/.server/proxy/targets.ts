const BACKEND_URL = process.env.KICL_BACKEND_URL || 'http://localhost:3100';
const DESIGN_URL = process.env.KICL_DESIGN_URL || 'http://localhost:3200';
const MOONSHOT_URL = process.env.KICL_MOONSHOT_URL || 'http://localhost:3301';
const I18N_URL = process.env.KICL_I18N_URL || 'http://localhost:3501';
const NOTIFICATION_URL = process.env.KICL_NOTIFICATION_URL || 'http://localhost:3401';

const AUDIENCES = [BACKEND_URL, DESIGN_URL, MOONSHOT_URL, NOTIFICATION_URL, I18N_URL];

// Only the API's image segments: the built site serves its own bundles under `/assets` too.
const ASSET_SEGMENTS = ['taxon-visual', 'static'];

// `/api/client` comes before `/api`, which would otherwise take it.
const ROUTES: Array<{ path: string; rewrite?: Record<string, string>; target: string; ws?: boolean }> = [
  { path: '/api/client', rewrite: { '^/api/client': '/client' }, target: BACKEND_URL },
  { path: '/api', target: BACKEND_URL, ws: true },
  ...ASSET_SEGMENTS.map((segment) => ({ path: `/assets/${segment}`, target: BACKEND_URL })),
  { path: '/design', target: DESIGN_URL },
  { path: '/moonshot', target: MOONSHOT_URL },
  { path: '/notification', target: NOTIFICATION_URL },
  { path: '/i18n', target: I18N_URL },
];

export { AUDIENCES, BACKEND_URL, ROUTES };
