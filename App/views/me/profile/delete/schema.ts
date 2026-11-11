import * as v from 'valibot';

// Hooks
import type { TFunction } from 'design/hooks';

export const deleteSchema = (t: TFunction<'me'>) =>
  v.object({
    currentPassword: v.pipe(
      v.string(),
      v.minLength(1, t('error', { context: 'password' }))
    ),
  });

export type DeleteValues = v.InferOutput<ReturnType<typeof deleteSchema>>;
