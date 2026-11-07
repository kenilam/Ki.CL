import type { TFunction } from 'i18next';
import * as v from 'valibot';

// Constants
import {
  MAX_FILE_BYTES,
  MAX_FILE_SIZE,
} from '@/views/experiments/kinetic-light/constants';

const startSchema = (t: TFunction<'kinetic-light'>) =>
  v.object({
    file: v.pipe(
      v.instance(File, t('error', { context: 'empty' })),
      v.check((file) => file.size > 0, t('error', { context: 'empty' })),
      v.check(
        (file) => file.size <= MAX_FILE_BYTES,
        t('error', { context: 'too_large', size: MAX_FILE_SIZE })
      )
    ),
  });

type StartValues = v.InferOutput<ReturnType<typeof startSchema>>;

export { startSchema, type StartValues };
