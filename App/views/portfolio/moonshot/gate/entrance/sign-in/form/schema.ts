import * as v from 'valibot';

// Hooks
import type { TFunction } from 'design/hooks';

export const signInSchema = (t: TFunction<'portfolio'>) =>
  v.object({
    email: v.pipe(v.string(), v.email(t('error', { context: 'email' }))),
    password: v.pipe(
      v.string(),
      v.minLength(1, t('error', { context: 'password' }))
    ),
  });

export type SignInValues = v.InferOutput<ReturnType<typeof signInSchema>>;
