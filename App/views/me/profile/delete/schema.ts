import * as v from 'valibot';

import type { TFunction } from 'i18next';

export const deleteSchema = (t: TFunction<'me'>) =>
  v.object({
    currentPassword: v.pipe(
      v.string(),
      v.minLength(1, t('error', { context: 'password' }))
    ),
  });

export type DeleteValues = v.InferOutput<ReturnType<typeof deleteSchema>>;
