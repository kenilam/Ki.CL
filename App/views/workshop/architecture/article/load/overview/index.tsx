import React, { useMemo } from 'react';

// Components
import { Diagram } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Diagrams
import { overview } from './spec';

const Overview: React.FunctionComponent = () => {
  const { t } = useTranslation('architecture');

  const spec = useMemo(() => {
    return overview(t);
  }, [t]);

  return <Diagram spec={spec} />;
};

export { Overview };
