import type { JSX } from 'react';

type IntrinsicOf<E extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[E];

type KeysOf<E extends keyof JSX.IntrinsicElements> = keyof IntrinsicOf<E>;

/** Keys that exist on some other `Is` host but not on `E`. */
type ForeignKeys<
  Is extends keyof JSX.IntrinsicElements,
  E extends Is,
> = Is extends unknown ? Exclude<KeysOf<Is>, KeysOf<E>> : never;

/**
 * Attrs that belong only to other hosts — set to `never` so e.g. `href` is
 * rejected when `is` is not `'a'` (plain unions otherwise allow extras).
 */
type ForbidForeignAttrs<
  Is extends keyof JSX.IntrinsicElements,
  E extends Is,
> = {
  [K in ForeignKeys<Is, E>]?: never;
};

/**
 * Discriminated props for components that pick a host via `is`.
 *
 * - Default element: `is` is optional (`is?: Default`)
 * - Other elements: `is` is required (`is: E`)
 *
 * Intrinsic attributes follow the chosen host — e.g. `href` only when `is='a'`.
 */
export type PolymorphicIsProps<
  Is extends keyof JSX.IntrinsicElements,
  Own extends object,
  Default extends Is,
> = {
  [E in Is]: (E extends Default ? { is?: Default } : { is: E }) &
    Own &
    Omit<IntrinsicOf<E>, keyof Own | 'is'> &
    ForbidForeignAttrs<Is, E>;
}[Is];
