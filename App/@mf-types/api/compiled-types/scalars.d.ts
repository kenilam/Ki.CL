/**
 * Branded scalar types for type-safe GraphQL scalars.
 * These prevent accidentally mixing UUID/JWT/EmailAddress at compile time.
 */
export type UUID = string & {
  readonly __brand: 'UUID';
};
export type JWT = string & {
  readonly __brand: 'JWT';
};
export type EmailAddress = string & {
  readonly __brand: 'EmailAddress';
};
export type URL = string & {
  readonly __brand: 'URL';
};
export type NonEmptyString = string & {
  readonly __brand: 'NonEmptyString';
};
export type DateTime = Date & {
  readonly __brand: 'DateTime';
};
export type DateTimeString = string & {
  readonly __brand: 'DateTime';
};
