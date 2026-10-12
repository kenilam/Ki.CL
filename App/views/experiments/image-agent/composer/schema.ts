import type { TFunction } from 'i18next';
import * as v from 'valibot';

/** The same bound the API enforces, so the message arrives before the round trip. */
const MAX_LENGTH = 150;

const composerSchema = (t: TFunction<'image-agent'>) =>
  v.object({
    text: v.pipe(
      v.string(),
      v.trim(),
      v.minLength(1, t('error', { context: 'empty' })),
      v.maxLength(
        MAX_LENGTH,
        t('error', { context: 'too_long', max: MAX_LENGTH })
      )
    ),
  });

type ComposerValues = v.InferOutput<ReturnType<typeof composerSchema>>;

export { composerSchema, MAX_LENGTH, type ComposerValues };
