import * as v from 'valibot';

/** The limits match the API's `PasswordChange` validation, which checks all of this again. */
export const PasswordSchema = v.pipe(
  v.object({
    CurrentPassword: v.pipe(
      v.string(),
      v.minLength(1, 'Enter your current password.')
    ),
    Password: v.pipe(
      v.string(),
      v.minLength(8, 'Use at least 8 characters.'),
      v.maxLength(128, 'Use 128 characters at most.')
    ),
  }),
  v.forward(
    v.partialCheck(
      [['CurrentPassword'], ['Password']],
      ({ CurrentPassword, Password }) => CurrentPassword !== Password,
      'Use a password different from your current one.'
    ),
    ['Password']
  )
);

export type PasswordValues = v.InferOutput<typeof PasswordSchema>;
