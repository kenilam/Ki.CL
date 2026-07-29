/**
 * Read the `aud` cookie to determine session type.
 */
export declare function getSessionType(): 'anon' | 'user' | null;
/**
 * Check if the user is authenticated (has a user session).
 */
export declare function isAuthenticated(): boolean;
/**
 * Check if any session exists (anon or user).
 */
export declare function hasSession(): boolean;
/**
 * Read the non-httpOnly `x-api-key` cookie (playground / local bootstrap).
 */
export declare function getApiKey(): string | null;
