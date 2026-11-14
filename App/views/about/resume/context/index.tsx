import React, { PropsWithChildren, useContext } from 'react';

// Status
import { Status404 } from 'design/status';

// Content
import type { Resolved } from '@/views/about/resume/content';

// Hooks
import { useResolvedVersion } from '@/views/about/resume/use-resolved-version';

/** The version on the page. Every section reads its own part from here. */
const VersionContext = React.createContext<Resolved | null>(null);

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const version = useResolvedVersion();

  if (!version) {
    return <Status404 />;
  }

  return (
    <VersionContext.Provider value={version}>
      {children}
    </VersionContext.Provider>
  );
};

const useVersion = () => {
  const version = useContext(VersionContext);

  if (!version) {
    throw new Error('useVersion needs a VersionContext around it.');
  }

  return version;
};

export { Provider, useVersion };
