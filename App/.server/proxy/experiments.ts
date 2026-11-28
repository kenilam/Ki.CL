import { readdir, readFile } from 'node:fs/promises';
import nodePath from 'node:path';

import type { NextFunction, Request, Response } from 'express';
import { GoogleAuth } from 'google-auth-library';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { currentIdToken, idTokenFor } from './index';

/**
 * Experiments with a service of their own, mounted from the registry: each
 * service's record names its mount (`experiments/color-swatches`), and this
 * server forwards that mount's `client/` and `files/` to the service, with an
 * identity token. A new experiment needs no release here.
 *
 * KICL_REGISTRY is the registry's bucket, or a directory of records locally.
 */
const REGISTRY = process.env.KICL_REGISTRY;
const POLL_MS = 30_000;
const PATH = /^\/(experiments\/[a-z0-9]+(?:-[a-z0-9]+)*)\/(?:client|files)(?:\/|$)/;

type ServiceRecord = { mount?: string; url: string };

let mounts = new Map<string, string>();
let auth: GoogleAuth | null = null;

async function bucketRecords(bucket: string): Promise<ServiceRecord[]> {
  auth ??= new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/devstorage.read_only'] });
  const client = await auth.getClient();
  const base = `https://storage.googleapis.com/storage/v1/b/${bucket}/o`;
  const { data } = await client.request<{ items?: Array<{ name: string }> }>({ url: `${base}?prefix=services/` });

  return Promise.all(
    (data.items ?? [])
      .filter(({ name }) => name.endsWith('.json'))
      .map(async ({ name }) => (await client.request<ServiceRecord>({ url: `${base}/${encodeURIComponent(name)}?alt=media` })).data)
  );
}

async function directoryRecords(directory: string): Promise<ServiceRecord[]> {
  const folder = nodePath.join(directory, 'services');
  const names = (await readdir(folder)).filter((name) => name.endsWith('.json'));

  return Promise.all(names.map(async (name) => JSON.parse(await readFile(nodePath.join(folder, name), 'utf8')) as ServiceRecord));
}

async function load(): Promise<void> {
  if (!REGISTRY) {
    return;
  }

  try {
    const records = REGISTRY.includes('/') ? await directoryRecords(REGISTRY) : await bucketRecords(REGISTRY);

    mounts = new Map(
      records
        .filter(({ mount }) => mount?.startsWith('experiments/'))
        .map(({ mount, url }) => [mount as string, url.replace(/\/api$/, '')])
    );
  } catch (error) {
    // The last good list stays in place.
    console.warn('Experiments: the registry could not be read -', error instanceof Error ? error.message : String(error));
  }
}

const targetOf = (path: string) => {
  const mount = PATH.exec(path)?.[1];

  return mount ? mounts.get(mount) : undefined;
};

export function experimentsProxy() {
  void load();
  setInterval(() => void load(), POLL_MS).unref();

  const proxy = createProxyMiddleware<Request, Response>({
    changeOrigin: true,
    router: (request) => targetOf(request.path) as string,
    on: {
      proxyReq: (proxyRequest, request) => {
        const token = currentIdToken(targetOf(request.path) ?? '');

        if (token) {
          proxyRequest.setHeader('Authorization', `Bearer ${token}`);
        }
      },
    },
  });

  return async (request: Request, response: Response, next: NextFunction) => {
    if (!PATH.test(request.path)) {
      next();
      return;
    }

    const target = targetOf(request.path);

    if (!target) {
      response.status(404).end();
      return;
    }

    // Fetched here, since the proxy's hooks are synchronous.
    await idTokenFor(target);
    await proxy(request, response, next);
  };
}
