import type { Kicl_ImageAgentThreadQuery } from 'api/provider';

/** One conversation as the API returns it; the subscription carries the same shape. */
export type Thread = NonNullable<
  Kicl_ImageAgentThreadQuery['ImageAgentThread']
>;

export type Message = Thread['messages'][number];

export type Score = NonNullable<Message['score']>;
