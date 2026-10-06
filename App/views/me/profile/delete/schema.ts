import * as v from 'valibot';

export const DeleteSchema = v.object({
  CurrentPassword: v.pipe(v.string(), v.minLength(1, 'Enter your password.')),
});

export type DeleteValues = v.InferOutput<typeof DeleteSchema>;
