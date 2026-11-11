import React, { useMemo } from 'react';

// Components
import { Diagram } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Diagrams
import { release } from './spec';

const Release: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  const spec = useMemo(() => {
    return release(t);
  }, [t]);

  return <Diagram spec={spec} />;
};

export { Release };
