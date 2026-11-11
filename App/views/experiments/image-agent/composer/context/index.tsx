import React, { PropsWithChildren, createContext, useContext } from 'react';

// Hooks
import { useComposer } from './use-composer';

type Props = PropsWithChildren<
  Parameters<typeof useComposer>[0] & {
    /** A turn is running, so sending is off. */
    busy: boolean;
    loading: boolean;
  }
>;

type Value = ReturnType<typeof useComposer> & Pick<Props, 'busy' | 'loading'>;

const ComposerContext = createContext<Value | null>(null);

/** The message field's form and the send of the page using it: the start page or a chat. */
const Provider: React.FunctionComponent<Props> = ({
  busy,
  children,
  error,
  loading,
  send,
}) => {
  const { form, submit } = useComposer({ error, send });

  return (
    <ComposerContext.Provider value={{ busy, form, loading, submit }}>
      {children}
    </ComposerContext.Provider>
  );
};

const useComposerContext = (): Value => {
  const value = useContext(ComposerContext);

  if (!value) {
    throw new Error('useComposerContext needs a Composer context above it.');
  }

  return value;
};

export { Provider, useComposerContext };
