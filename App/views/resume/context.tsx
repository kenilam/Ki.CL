import React, { PropsWithChildren, useContext } from 'react';

// Content
import { MASTER, type Version } from './content';

const Context = React.createContext<Version>(MASTER);

type Props = PropsWithChildren<{ version: Version }>;

/** The version on the page. Every section reads its own part from here. */
const VersionProvider: React.FunctionComponent<Props> = ({
  children,
  version,
}) => <Context.Provider value={version}>{children}</Context.Provider>;

const useVersion = () => useContext(Context);

export { VersionProvider, useVersion };
