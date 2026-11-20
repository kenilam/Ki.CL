import * as v from 'valibot';

// Hooks
import type { TFunction } from 'design/hooks';

// Constants
import {
  MAX_FILE_BYTES,
  MAX_FILE_SIZE,
} from '@/views/experiments/swatch/constants';

const uploadSchema = (t: TFunction<'swatch'>) =>
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

type UploadValues = v.InferOutput<ReturnType<typeof uploadSchema>>;

export { uploadSchema, type UploadValues };
