import * as v from 'valibot';

import type { TFunction } from 'i18next';

export const signInSchema = (t: TFunction<'portfolio'>) =>
  v.object({
    Email: v.pipe(v.string(), v.email(t('error', { context: 'email' }))),
    Password: v.pipe(
      v.string(),
      v.minLength(1, t('error', { context: 'password' }))
    ),
  });

export type SignInValues = v.InferOutput<ReturnType<typeof signInSchema>>;
