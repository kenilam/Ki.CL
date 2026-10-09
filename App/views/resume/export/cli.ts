import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

import * as dotenv from 'dotenv';

// Relative, not `@/`: this runs under tsx, outside Vite and its aliases.
import { FILE, OBJECT, PATH, PHONE_KEY } from '../constants';
import { MASTER, VERSIONS, fingerprint, type Version } from '../content';

import { launch, type Tab } from './chrome';

/**
 * Prints the resume to PDF from the site running locally, so the PDF is the
 * page and not a second rendering of it. Start the site first (`make run`,
 * with the API and the design system up).
 *
 *   make resume.pdf
 *   make resume.pdf.private OUT=~/Desktop/resume/designed
 *
 * `public` prints the master without a phone number, uploads it to the static
 * bucket named in `gcp/.env`, where the site serves it from, and records what
 * it was made from. Commit the record. It needs `gcloud`, signed in to an
 * account that may write to the bucket. `private` writes every version on
 * Letter and A4 into a folder outside the repository, with the phone number
 * from `KICL_RESUME_PHONE` in `.env`.
 *
 * Nothing is written for a version that runs past two sheets, that was set in
 * the fallback typeface, or that did not render.
 */

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '../../../..');
const APP = join(ROOT, 'App');

dotenv.config({ path: join(ROOT, '.env'), quiet: true });

/** In inches, which is what the protocol takes. */
const PAPERS = {
  a4: { height: 11.69, width: 8.27 },
  letter: { height: 11, width: 8.5 },
} as const;

type Paper = keyof typeof PAPERS;

const MAX_PAGES = 2;

/** The brand typeface and the weights the page sets text in. */
const FACE = 'mic-32-new-web';
const WEIGHTS = ['300', '700'];

/** The first request to a cold dev server compiles the route. */
const READY_MS = 90_000;

const NAME = 'keni-lam-resume';

/** The public PDF before it is uploaded. `.temp` is not in git. */
const STAGED = join(ROOT, '.temp', OBJECT);

/**
 * Copies the public PDF into the static bucket, over the last one. The bucket
 * and its project are named in `gcp/.env`, which is not in git. The object
 * keeps the bucket's default caching: revalidated on every request, so a new
 * export is what the next reader gets.
 */
const upload = (file: string) => {
  const { PROJECT, STATIC_BUCKET } = dotenv.parse(
    readFileSync(join(ROOT, 'gcp', '.env'))
  );

  if (!PROJECT || !STATIC_BUCKET) {
    fail('gcp/.env needs PROJECT and STATIC_BUCKET to upload the PDF.');
  }

  execFileSync(
    'gcloud',
    [
      'storage',
      'cp',
      file,
      `gs://${STATIC_BUCKET}/${OBJECT}`,
      '--content-type=application/pdf',
      `--project=${PROJECT}`,
    ],
    { stdio: 'inherit' }
  );
};

type Job = {
  file: string;
  paper: Paper;
  phone?: string;
  version: Version;
};

type Ready = {
  face: boolean;
  version: string | null;
};

const { positionals, values } = parseArgs({
  allowPositionals: true,
  options: {
    out: { type: 'string' },
    url: { type: 'string' },
  },
});

const fail = (message: string): never => {
  console.error(message);
  process.exit(1);
};

/** Where `make run` serves the site: the same address the Vite config opens. */
const localUrl = () => {
  const { domain, host } = JSON.parse(
    readFileSync(join(APP, 'app.config.json'), 'utf8')
  );

  return `https://${host}.${domain}:${process.env.PORT ?? 3001}`;
};

const base = (values.url ?? localUrl()).replace(/\/$/, '');

const toUrl = ({ slug }: Version) =>
  slug === MASTER.slug ? `${base}/${PATH}` : `${base}/${PATH}/${slug}`;

/**
 * Runs in the page. Waits for the version to render and for the brand
 * typeface to load in each weight, then reports what it found. `check()` is
 * no use here: it is true for a family that was never declared.
 */
const READY = `(async () => {
  const until = Date.now() + ${READY_MS};
  const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const article = () => document.querySelector('article[data-version]');
  const loaded = () =>
    ${JSON.stringify(WEIGHTS)}.every((weight) =>
      [...document.fonts].some(
        (face) =>
          face.family.replace(/["']/g, '') === ${JSON.stringify(FACE)} &&
          face.weight === weight &&
          face.status === 'loaded'
      )
    );

  while (Date.now() < until && !(article() && loaded())) {
    await pause(100);
  }

  await document.fonts.ready;
  // One more turn, so the last face to arrive is laid out before the print.
  await pause(200);

  return { face: loaded(), version: article()?.dataset.version ?? null };
})()`;

const countPages = (pdf: Buffer) =>
  pdf.toString('latin1').match(/\/Type\s*\/Page(?![A-Za-z])/g)?.length ?? 0;

/** Prints one job. Returns the page count, or why nothing was written. */
const print = async (tab: Tab, job: Job): Promise<number | string> => {
  const { file, paper, phone, version } = job;

  // Scripts registered for new documents only run once the page domain is on.
  await tab.send('Page.enable');

  if (phone) {
    // Before any script of the page's: the contact line reads it as it renders.
    await tab.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `try { localStorage.setItem(${JSON.stringify(PHONE_KEY)}, ${JSON.stringify(phone)}); } catch {}`,
    });
  }

  const { errorText } = await tab.send<{ errorText?: string }>(
    'Page.navigate',
    { url: toUrl(version) }
  );

  if (errorText) {
    return `${toUrl(version)} did not load (${errorText}). Is the site running?`;
  }

  const { result } = await tab.send<{ result: { value?: Ready } }>(
    'Runtime.evaluate',
    { awaitPromise: true, expression: READY, returnByValue: true }
  );

  const ready = result.value;

  if (ready?.version !== version.slug) {
    return `${toUrl(version)} did not render the ${version.slug} version.`;
  }

  if (!ready.face) {
    return `${FACE} did not load, so the page is in the fallback typeface.`;
  }

  // The margins are the page's own, from `@page`. These only stop Chrome adding its default.
  const { data } = await tab.send<{ data: string }>('Page.printToPDF', {
    displayHeaderFooter: false,
    generateTaggedPDF: true,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    paperHeight: PAPERS[paper].height,
    paperWidth: PAPERS[paper].width,
    printBackground: true,
  });

  const pdf = Buffer.from(data, 'base64');
  const pages = countPages(pdf);

  if (pages > MAX_PAGES) {
    return `${pages} pages on ${paper}. The limit is ${MAX_PAGES}: shorten it, or lower --kicl-print-font-size.`;
  }

  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, pdf);

  console.info(
    [
      version.slug.padEnd(13),
      paper.padEnd(7),
      `${pages} pages`,
      `${Math.round(pdf.length / 1024)} KB`.padStart(7),
      file,
    ].join('  ')
  );

  return pages;
};

const [command] = positionals;

const jobs: Job[] = [];

if (command === 'public') {
  jobs.push({
    file: STAGED,
    paper: 'letter',
    version: MASTER,
  });
} else if (command === 'private') {
  const out = values.out ?? fail('Say where they go: OUT=~/Desktop/resume');
  const phone = process.env.KICL_RESUME_PHONE?.trim() || undefined;

  if (!phone) {
    console.warn(
      'KICL_RESUME_PHONE is not set, so these carry no phone number.'
    );
  }

  for (const version of VERSIONS) {
    for (const paper of ['letter', 'a4'] as const) {
      jobs.push({
        // One name in every folder, so the file says nothing about its version.
        file: join(
          resolve(out),
          version.slug,
          paper === 'letter' ? `${NAME}.pdf` : `${NAME}-${paper}.pdf`
        ),
        paper,
        phone,
        version,
      });
    }
  }
} else {
  fail('Usage: cli.ts public | cli.ts private --out <folder> [--url <site>]');
}

/** Prints every job in one Chrome, and returns the last page count. */
const run = async () => {
  const chrome = await launch();

  const refused: string[] = [];

  let pages = 0;

  try {
    for (const job of jobs) {
      // A tab each, so one job's phone number is never left behind for the next.
      const tab = await chrome.open();

      const outcome = await print(tab, job);

      await tab.close();

      if (typeof outcome === 'string') {
        refused.push(`${job.version.slug} on ${job.paper}: ${outcome}`);
      } else {
        pages = outcome;
      }
    }
  } finally {
    await chrome.close();
  }

  if (refused.length) {
    fail(`Not written:\n${refused.map((line) => `  ${line}`).join('\n')}`);
  }

  return pages;
};

run()
  .then((pages) => {
    if (command !== 'public') {
      return;
    }

    // Before the record: the page offers the file once the record matches.
    upload(STAGED);

    const record = {
      // The local date, as year-month-day.
      exported: new Date().toLocaleDateString('en-CA'),
      fingerprint: fingerprint(MASTER),
      pages,
    };

    writeFileSync(
      join(HERE, '../content/exported.json'),
      `${JSON.stringify(record, null, 2)}\n`
    );

    console.info(`Uploaded to ${FILE}. Commit content/exported.json.`);
  })
  .catch((error: unknown) => {
    fail(error instanceof Error ? error.message : String(error));
  });
