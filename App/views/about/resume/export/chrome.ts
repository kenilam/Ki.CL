import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

/**
 * The installed Chrome, headless, spoken to over the DevTools protocol on
 * Node's own WebSocket. It prints the way a reader's browser does, with the
 * same engine and the same print styles, and it adds no dependency: no
 * Puppeteer, no browser download, nothing for Renovate to keep current.
 *
 * Only what the export needs is here. If it ever needs a second browser, or
 * retries and tracing, that is the day to take `playwright-core` instead.
 */

const CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];

/** How long Chrome gets to start and say where it is listening. */
const START_MS = 15_000;

/** How long any one command may take. Printing two sheets takes well under a second. */
const COMMAND_MS = 60_000;

/** How long Chrome gets to exit before its profile is cleared anyway. */
const EXIT_MS = 5_000;

type Params = Record<string, unknown>;

type Pending = {
  reject: (reason: Error) => void;
  resolve: (result: never) => void;
  timer: NodeJS.Timeout;
};

type Message = {
  error?: { message: string };
  id?: number;
  result?: unknown;
};

/** One tab. Commands sent through it reach that tab only. */
type Tab = {
  close: () => Promise<void>;
  send: <Result = unknown>(method: string, params?: Params) => Promise<Result>;
};

type Chrome = {
  close: () => Promise<void>;
  open: () => Promise<Tab>;
};

const findChrome = (): string => {
  const path = [process.env.CHROME_PATH, ...CANDIDATES].find(
    (candidate) => candidate && existsSync(candidate)
  );

  if (!path) {
    throw new Error(
      'No Chrome found. Install it, or point CHROME_PATH at a Chromium binary.'
    );
  }

  return path;
};

/** Starts Chrome and resolves with the address of its DevTools socket. */
const start = (path: string, profile: string) => {
  const child = spawn(
    path,
    [
      '--headless=new',
      '--remote-debugging-port=0',
      `--user-data-dir=${profile}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-extensions',
      // It is here to print one page. No sync, no updates, no calls home.
      '--disable-background-networking',
      '--disable-component-update',
      '--disable-sync',
      // For a container that runs as root. Unset everywhere else.
      ...(process.env.CHROME_ARGS?.split(' ').filter(Boolean) ?? []),
      'about:blank',
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] }
  );

  const address = new Promise<string>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Chrome did not start in time.'));
    }, START_MS);

    let output = '';

    child.stderr.on('data', (chunk: Buffer) => {
      output += chunk.toString();

      const [, url] = /DevTools listening on (ws:\/\/\S+)/.exec(output) ?? [];

      if (url) {
        clearTimeout(timer);
        resolve(url);
      }
    });

    child.once('exit', (code) => {
      clearTimeout(timer);
      reject(new Error(`Chrome exited early, with code ${code}.`));
    });
  });

  return { address, child };
};

const connect = (url: string) =>
  new Promise<WebSocket>((resolve, reject) => {
    const socket = new WebSocket(url);

    socket.addEventListener('open', () => resolve(socket), { once: true });
    socket.addEventListener(
      'error',
      () => reject(new Error('Could not reach Chrome on its DevTools socket.')),
      { once: true }
    );
  });

const launch = async (): Promise<Chrome> => {
  // A fresh profile each run: no sign-ins, no extensions, no stored theme.
  const profile = mkdtempSync(join(tmpdir(), 'kicl-resume-'));

  const { address, child } = start(findChrome(), profile);

  /*
   * Chrome writes to its profile until it has gone, so the folder is cleared
   * only then. A folder that will not go is left for the system to clear: the
   * PDFs are already written, and a temporary folder is no reason to fail.
   */
  const close = async () => {
    const exited = new Promise<void>((resolve) => {
      child.once('exit', () => resolve());
      setTimeout(resolve, EXIT_MS);
    });

    child.kill();

    await exited;

    try {
      rmSync(profile, {
        force: true,
        maxRetries: 5,
        recursive: true,
        retryDelay: 200,
      });
    } catch {
      console.warn(`Left behind: ${profile}`);
    }
  };

  let socket: WebSocket;

  try {
    socket = await connect(await address);
  } catch (error) {
    await close();

    throw error;
  }

  const pending = new Map<number, Pending>();

  let lastId = 0;

  socket.addEventListener('message', (event) => {
    const { error, id, result }: Message = JSON.parse(String(event.data));

    const waiting = id === undefined ? undefined : pending.get(id);

    // Without an id it is an event, and the export listens for none.
    if (id === undefined || !waiting) {
      return;
    }

    pending.delete(id);
    clearTimeout(waiting.timer);

    if (error) {
      waiting.reject(new Error(error.message));

      return;
    }

    waiting.resolve(result as never);
  });

  const send = <Result>(method: string, params: Params, sessionId?: string) =>
    new Promise<Result>((resolve, reject) => {
      const id = (lastId += 1);

      const timer = setTimeout(() => {
        pending.delete(id);
        reject(new Error(`${method} took longer than ${COMMAND_MS / 1000}s.`));
      }, COMMAND_MS);

      pending.set(id, { reject, resolve, timer });
      socket.send(JSON.stringify({ id, method, params, sessionId }));
    });

  const open = async (): Promise<Tab> => {
    const { targetId } = await send<{ targetId: string }>(
      'Target.createTarget',
      { url: 'about:blank' }
    );

    const { sessionId } = await send<{ sessionId: string }>(
      'Target.attachToTarget',
      { flatten: true, targetId }
    );

    return {
      close: async () => {
        await send('Target.closeTarget', { targetId });
      },
      send: (method, params = {}) => send(method, params, sessionId),
    };
  };

  return {
    close: async () => {
      socket.close();

      await close();
    },
    open,
  };
};

export { launch, type Chrome, type Tab };
