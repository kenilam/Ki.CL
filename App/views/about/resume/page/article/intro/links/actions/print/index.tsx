import React from 'react';

import classNames from 'classnames';

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
        className={classNames('kicl-font-family-mono', 'kicl-font-size-small')}
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
