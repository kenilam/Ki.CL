import React from 'react';

import { Button, ListItem } from 'design/components';
import { useTranslation } from 'design/hooks';

const print = () => {
  window.print();
};

const Print: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <ListItem>
      <Button
        className='kicl-font-family-mono'
        data-track='Resume print'
        lookLikeHyperLink
        onClick={print}
      >
        {t('action', { context: 'print' })}
      </Button>
    </ListItem>
  );
};

export { Print };
