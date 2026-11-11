import React, { useMemo } from 'react';

// Components
import { Diagram } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Diagrams
import { direction } from './spec';

const Direction: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  const spec = useMemo(() => {
    return direction(t);
  }, [t]);

  return <Diagram spec={spec} />;
};

export { Direction };
