import {
  createPrivateKey,
  createPublicKey,
  sign,
  verify,
  type KeyObject,
} from 'node:crypto';
import type { IncomingMessage } from 'node:http';

import type { Express } from 'express';

/**
 * Lets a trusted client outside this origin, such as a federated module run
 * on a developer's machine, use a dev deployment. The client's own server
 * proxies here and adds a signed token to every request, and a valid token
 * skips the dev gate. The services behind the proxy still check the client's
 * origin themselves (the API's `CORS_ORIGINS`). Without a token nothing
 * changes.
 *
 * The token is an EdDSA JWT. Only the public key lives here, so a leaked
 * environment cannot be used to issue tokens.
 */
const TOKEN_HEADER = 'x-kicl-client-token';

type Claims = {
  sub: string;
  iat: number;
  exp: number;
};

const encode = (value: object) =>
  Buffer.from(JSON.stringify(value)).toString('base64url');

const decode = (value: string): unknown =>
  JSON.parse(Buffer.from(value, 'base64url').toString());

/** One-line base64 DER, so the keys fit in an environment variable. */
const toPublicKey = (value: string) =>
  createPublicKey({
    key: Buffer.from(value, 'base64'),
    format: 'der',
    type: 'spki',
  });

const toPrivateKey = (value: string) =>
  createPrivateKey({
    key: Buffer.from(value, 'base64'),
    format: 'der',
    type: 'pkcs8',
  });

function signClientToken(claims: Claims, privateKey: KeyObject): string {
  const body = `${encode({ alg: 'EdDSA', typ: 'JWT' })}.${encode(claims)}`;
  const signature = sign(null, Buffer.from(body), privateKey);

  return `${body}.${signature.toString('base64url')}`;
}

function verifyClientToken(
  token: string,
  publicKey: KeyObject,
  now = Date.now()
): Claims | null {
  const [header, payload, signature] = token.split('.');

  if (!header || !payload || !signature) {
    return null;
  }

  try {
    const valid = verify(
      null,
      Buffer.from(`${header}.${payload}`),
      publicKey,
      Buffer.from(signature, 'base64url')
    );
    const { alg } = decode(header) as { alg?: string };
    const claims = decode(payload) as Partial<Claims>;

    if (!valid || alg !== 'EdDSA' || typeof claims.sub !== 'string') {
      return null;
    }

    if (typeof claims.exp !== 'number' || claims.exp * 1000 <= now) {
      return null;
    }

    return claims as Claims;
  } catch {
    return null;
  }
}

const publicKey = process.env.KICL_CLIENT_PUBLIC_KEY
  ? toPublicKey(process.env.KICL_CLIENT_PUBLIC_KEY)
  : null;

/** Subjects cut off before their token expires, comma-separated. */
const denied = new Set(
  (process.env.KICL_CLIENT_DENY ?? '')
    .split(',')
    .map((sub) => sub.trim())
    .filter(Boolean)
);

/**
 * Reads the client's token and removes it, so it never reaches the services.
 * Runs on ordinary requests and on WebSocket upgrades, which never pass
 * through Express. `undefined` when no token was sent, `null` when one was
 * sent and failed.
 */
function checkClientToken(request: IncomingMessage): Claims | null | undefined {
  const token = request.headers[TOKEN_HEADER];

  delete request.headers[TOKEN_HEADER];

  if (typeof token !== 'string') {
    return undefined;
  }

  const verified = publicKey ? verifyClientToken(token, publicKey) : null;

  return verified && !denied.has(verified.sub) ? verified : null;
}

function applyClientToken(app: Express): void {
  app.use((request, response, next) => {
    const claims = checkClientToken(request);

    // A token that was sent but does not verify is refused outright, so a
    // client with an expired one sees why instead of a password prompt.
    if (claims === null) {
      response
        .status(401)
        .set('Cache-Control', 'no-store')
        .send('Client token is invalid or expired.');

      return;
    }

    response.locals.client = claims?.sub;

    next();
  });
}

export {
  applyClientToken,
  checkClientToken,
  signClientToken,
  toPrivateKey,
  toPublicKey,
  verifyClientToken,
};
export type { Claims };
