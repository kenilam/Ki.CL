import React from 'react';

// Components
import { Heading } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { TITLE_ID } from '@/views/workshop/home/constants';

const Title: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Heading id={TITLE_ID} lookLike='display'>
      {t('workshop')}
    </Heading>
  );
};

export { Title };
