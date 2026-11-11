import React, { useMemo } from 'react';

// Components
import { Diagram } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Diagrams
import { limits } from './spec';

const Limits: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  const spec = useMemo(() => {
    return limits(t);
  }, [t]);

  return <Diagram spec={spec} />;
};

export { Limits };
