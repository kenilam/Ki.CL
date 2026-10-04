import { generateKeyPairSync } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname } from 'node:path';
import { parseArgs } from 'node:util';

import { signClientToken, toPrivateKey } from '.';

/**
 * Issues client tokens. The private key stays on the issuer's machine, outside
 * the repo; only the public key is deployed, as `KICL_CLIENT_PUBLIC_KEY`.
 *
 *   make client-token.keys
 *   make client-token SUB=jane@example.com DAYS=14
 */

const DAY_MS = 24 * 60 * 60 * 1000;

const { positionals, values } = parseArgs({
  allowPositionals: true,
  options: {
    days: { type: 'string', default: '14' },
    key: { type: 'string', default: `${homedir()}/.kicl/client-token.key` },
    sub: { type: 'string' },
  },
});

const fail = (message: string): never => {
  console.error(message);
  process.exit(1);
};

const [command] = positionals;

if (command === 'keys') {
  // Never replaced: that would cut off every token already issued.
  if (existsSync(values.key)) {
    fail(`${values.key} exists. Move it away first to start a new key pair.`);
  }

  const { privateKey, publicKey } = generateKeyPairSync('ed25519');

  mkdirSync(dirname(values.key), { recursive: true, mode: 0o700 });
  writeFileSync(
    values.key,
    privateKey.export({ format: 'der', type: 'pkcs8' }).toString('base64'),
    { mode: 0o600 }
  );

  console.info(`Private key written to ${values.key}. Keep it there.`);
  console.info('Set this as KICL_CLIENT_PUBLIC_KEY on the Ki.CL server:');
  console.info(
    publicKey.export({ format: 'der', type: 'spki' }).toString('base64')
  );
} else if (command === 'mint') {
  const days = Number(values.days);
  const sub = values.sub?.trim();

  if (!sub) {
    fail('Give the token a subject, such as the person it is for: SUB=…');
  }

  if (!Number.isInteger(days) || days < 1 || days > 90) {
    fail('DAYS has to be a whole number from 1 to 90.');
  }

  if (!existsSync(values.key)) {
    fail(`No private key at ${values.key}. Run make client-token.keys first.`);
  }

  const now = Date.now();
  const token = signClientToken(
    {
      sub: sub as string,
      iat: Math.floor(now / 1000),
      exp: Math.floor((now + days * DAY_MS) / 1000),
    },
    toPrivateKey(readFileSync(values.key, 'utf8').trim())
  );

  console.info(token);
} else {
  fail('Usage: cli.ts keys | mint --sub <name> [--days 14] [--key <path>]');
}
