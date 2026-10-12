import * as v from 'valibot';

import type { TFunction } from 'i18next';

const MAX_NAME = 100;

const name = (t: TFunction<'me'>) =>
  v.pipe(
    v.string(),
    v.trim(),
    v.maxLength(MAX_NAME, t('error', { context: 'too_long', max: MAX_NAME }))
  );

/** The limit matches the API's `UpdateMe` validation. */
export const profileSchema = (t: TFunction<'me'>) =>
  v.object({
    FirstName: name(t),
    LastName: name(t),
  });

export type ProfileValues = v.InferOutput<ReturnType<typeof profileSchema>>;
