import { readdir, readFile } from 'node:fs/promises';
import nodePath from 'node:path';

import { GoogleAuth } from 'google-auth-library';

// KICL_REGISTRY is the registry's bucket, or a directory of records locally.
const REGISTRY = process.env.KICL_REGISTRY;
const POLL_MS = 30_000;

type ServiceRecord = { mount?: string; url: string };

// Each experiment's mount and the service behind it.
const mounts = new Map<ServiceRecord['mount'], ServiceRecord['url']>();
let auth: GoogleAuth | null = null;

type Registry = NonNullable<typeof REGISTRY>;

async function bucket(name: Registry): Promise<ServiceRecord[]> {
  auth ??= new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/devstorage.read_only'] });

  const client = await auth.getClient();
  const base = `https://storage.googleapis.com/storage/v1/b/${name}/o`;
  const { data } = await client.request<{ items?: Array<{ name: string }> }>({ url: `${base}?prefix=services/` });

  return Promise.all(
    (data.items ?? []).map(async ({ name }) => (await client.request<ServiceRecord>({ url: `${base}/${encodeURIComponent(name)}?alt=media` })).data)
  );
}

async function directory(path: Registry): Promise<ServiceRecord[]> {
  const folder = nodePath.join(path, 'services');

  return Promise.all(
    (await readdir(folder)).map(async (name) => JSON.parse(await readFile(nodePath.join(folder, name), 'utf8')) as ServiceRecord)
  );
}

async function load(): Promise<void> {
  if (!REGISTRY) {
    return;
  }

  try {
    const records = REGISTRY.includes('/') ? await directory(REGISTRY) : await bucket(REGISTRY);

    mounts.clear();
    records
      .filter(({ mount }) => mount?.startsWith('experiments/'))
      .forEach(({ mount, url }) => mounts.set(mount, url.replace(/\/api$/, '')));
  } catch (error) {
    // The last list read stays in place.
    console.warn('Experiments: the registry could not be read -', error instanceof Error ? error.message : String(error));
  }
}

export { mounts };

export function watch(): void {
  void load();
  setInterval(() => void load(), POLL_MS).unref();
}
