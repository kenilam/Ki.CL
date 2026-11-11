import React from 'react';

// Components
import { Heading } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { TITLE_ID } from '@/session/challenge/constants';

const Title: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Heading dense id={TITLE_ID}>
      {t('session', { context: 'checking' })}
    </Heading>
  );
};

export { Title };
