import React from 'react';

// Components
import { Button } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { ENTRY_ID } from '@/views/resume/constants';

const Resume: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Button command='show-modal' commandfor={ENTRY_ID} lookLikeHyperLink>
      {t('resume')}
    </Button>
  );
};

export { Resume };
