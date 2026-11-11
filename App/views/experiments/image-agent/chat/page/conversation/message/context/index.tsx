import React, { PropsWithChildren, createContext, useContext } from 'react';

// Context
import { useThreadContext } from '@/views/experiments/image-agent/chat/context';

// Spec
import type { Message } from '@/views/experiments/image-agent/chat/spec';

type Value = { message: Message };

/** One turn, for the parts of its bubble. */
const MessageContext = createContext<Value | null>(null);

const Provider: React.FunctionComponent<
  PropsWithChildren<Pick<Message, 'id'>>
> = ({ children, id }) => {
  const { thread } = useThreadContext();
  const message = thread?.messages.find((each) => {
    return each.id === id;
  });

  if (!message) {
    return null;
  }

  return (
    <MessageContext.Provider value={{ message }}>
      {children}
    </MessageContext.Provider>
  );
};

const useMessageContext = (): Value => {
  const value = useContext(MessageContext);

  if (!value) {
    throw new Error('useMessageContext needs a MessageContext above it.');
  }

  return value;
};

export { Provider, useMessageContext };
