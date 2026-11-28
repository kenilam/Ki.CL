import { GoogleAuth } from 'google-auth-library';

// Under the hour a token lasts, and kept in memory: a WebSocket upgrade can't await one.
const TTL_MS = 45 * 60 * 1000;

type Audience = Parameters<GoogleAuth['getIdTokenClient']>[0];

const cached = new Map<Audience, { value: string; expiresAt: number }>();
let auth: GoogleAuth | null = null;

async function mint(audience: Audience) {
  try {
    auth ??= new GoogleAuth();

    const client = await auth.getIdTokenClient(audience);
    const value = await client.idTokenProvider.fetchIdToken(audience);

    cached.set(audience, { value, expiresAt: Date.now() + TTL_MS });

    return value;
  } catch (error) {
    // Expected locally, where there's no metadata server and the services take calls without one.
    console.warn(`Proxy: no identity token for ${audience} -`, error instanceof Error ? error.message : String(error));

    return null;
  }
}

/** The token in memory, renewed in the background once it ages out. */
export function current(audience: Audience) {
  const token = cached.get(audience);

  if (token && Date.now() >= token.expiresAt) {
    void mint(audience);
  }

  return token?.value ?? null;
}

export async function get(audience: Audience) {
  return current(audience) ?? mint(audience);
}

export async function warm(audiences: Audience[]) {
  await Promise.all(audiences.map(mint));
}
