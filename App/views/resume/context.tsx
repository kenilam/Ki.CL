import React, { PropsWithChildren, useContext } from 'react';

// Content
import type { Resolved } from './content';

const Context = React.createContext<Resolved | null>(null);

type Props = PropsWithChildren<{ version: Resolved }>;

/** The version on the page. Every section reads its own part from here. */
const VersionProvider: React.FunctionComponent<Props> = ({
  children,
  version,
}) => <Context.Provider value={version}>{children}</Context.Provider>;

const useVersion = () => {
  const version = useContext(Context);

  if (!version) {
    throw new Error('useVersion needs a VersionProvider around it.');
  }

  return version;
};

export { VersionProvider, useVersion };
