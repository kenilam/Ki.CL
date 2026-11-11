import React from 'react';

// Components
import { Status } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const Pick: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');

  return (
    <Status
      in
      level='info'
      title={t('title', { context: 'plate' })}
      headingLevel='h3'
      message={t('plate', { context: 'pick' })}
      justifyContent='start'
      property='fade'
    />
  );
};

export { Pick };
