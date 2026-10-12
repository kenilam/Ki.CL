import * as v from 'valibot';

import type { TFunction } from 'i18next';

const MIN_PASSWORD = 8;
const MAX_PASSWORD = 128;

/** The limits match the API's `PasswordChange` validation, which checks all of this again. */
export const passwordSchema = (t: TFunction<'me'>) =>
  v.pipe(
    v.object({
      CurrentPassword: v.pipe(
        v.string(),
        v.minLength(1, t('error', { context: 'current_password' }))
      ),
      Password: v.pipe(
        v.string(),
        v.minLength(
          MIN_PASSWORD,
          t('error', { context: 'too_short', min: MIN_PASSWORD })
        ),
        v.maxLength(
          MAX_PASSWORD,
          t('error', { context: 'too_long', max: MAX_PASSWORD })
        )
      ),
    }),
    v.forward(
      v.partialCheck(
        [['CurrentPassword'], ['Password']],
        ({ CurrentPassword, Password }) => CurrentPassword !== Password,
        t('error', { context: 'same_password' })
      ),
      ['Password']
    )
  );

export type PasswordValues = v.InferOutput<ReturnType<typeof passwordSchema>>;
