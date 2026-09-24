import * as v from 'valibot';

/** The same bound the API enforces, so the message arrives before the round trip. */
const MAX_LENGTH = 150;

const ComposerSchema = v.object({
  text: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(1, 'Say what the picture should show.'),
    v.maxLength(MAX_LENGTH, `Keep it to ${MAX_LENGTH} characters or fewer.`)
  ),
});

type ComposerValues = v.InferOutput<typeof ComposerSchema>;

export { ComposerSchema, MAX_LENGTH, type ComposerValues };
