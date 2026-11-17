import React from 'react';

import { Button, ListItem } from 'design/components';
import { useTranslation } from 'design/hooks';

import { ENTRY_ID } from '@/views/resume/constants';

const Resume: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <ListItem>
      <Button
        className='kicl-font-family-mono'
        command='show-modal'
        commandfor={ENTRY_ID}
        lookLikeHyperLink
      >
        {t('resume')}
      </Button>
    </ListItem>
  );
};

export { Resume };
