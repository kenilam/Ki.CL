import * as v from 'valibot';

export const SignInSchema = v.object({
  Email: v.pipe(v.string(), v.email('Enter a valid email address.')),
  Password: v.pipe(v.string(), v.minLength(1, 'Enter the password.')),
});

export type SignInValues = v.InferOutput<typeof SignInSchema>;
