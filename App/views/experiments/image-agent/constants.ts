import { PATH as EXPERIMENTS } from '@/views/experiments/constants';

/** Route segment for this view. */
const PATH = 'image-agent';

/** Route param for the open conversation, `/:threadId`. */
const PARAM = 'threadId';

/** Child route pattern, relative to `PATH`. */
const THREAD_PATTERN = `:${PARAM}`;

/** Root of every class and custom property this view owns. */
const CLASS_NAME = 'kicl--views--experiments--image-agent';

/**
 * Absolute path for a conversation, or for the view itself when none is
 * given. The URL holds which conversation is on screen, so a reload shows
 * the same one.
 */
const toPath = (threadId?: string | null): string =>
  threadId ? `/${EXPERIMENTS}/${PATH}/${threadId}` : `/${EXPERIMENTS}/${PATH}`;

/** What to call a conversation in a list: its brief, else what was first asked. */
const toLabel = (thread: {
  brief?: string | null;
  id: string;
  messages: ReadonlyArray<{ role: string; text?: string | null }>;
}): string =>
  thread.brief ??
  thread.messages.find(({ role }) => role === 'USER')?.text ??
  thread.id;

export { CLASS_NAME, PARAM, PATH, THREAD_PATTERN, toLabel, toPath };
