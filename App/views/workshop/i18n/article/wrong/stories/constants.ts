const STORIES = [
  { context: 'every_request', paragraphs: ['every_request'] },
  { context: 'mixed', paragraphs: ['mixed'] },
  { context: 'lost', paragraphs: ['lost', 'lost_cause'] },
  { context: 'plurals', paragraphs: ['plurals'] },
  { context: 'quota', paragraphs: ['quota', 'quota_cause', 'quota_fix'] },
] as const;

export { STORIES };
