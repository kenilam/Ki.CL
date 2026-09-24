/** What the composer needs from the page using it: the start page or a chat. */
export type Sender = {
  error: Error | undefined;
  loading: boolean;
  /** Resolves to whether the agent accepted the message. */
  send: (text: string) => Promise<boolean>;
};
