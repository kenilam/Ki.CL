import * as v from 'valibot';

const MAX_NAME = 100;

const name = v.pipe(
  v.string(),
  v.trim(),
  v.maxLength(MAX_NAME, `Use ${MAX_NAME} characters at most.`)
);

/** The limit matches the API's `UpdateMe` validation. */
export const ProfileSchema = v.object({
  FirstName: name,
  LastName: name,
});

export type ProfileValues = v.InferOutput<typeof ProfileSchema>;
