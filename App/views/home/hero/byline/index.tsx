import React from 'react';

import classNames from 'classnames';

import { Text } from 'design/components';
import { useTranslation } from 'design/hooks';

const Byline: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Text
      className={classNames(
        'kicl-color-neutral-a64',
        'kicl-font-size-small',
        'kicl-padding-block-end',
        'kicl-text-align-center'
      )}
    >
      {t('name')}
    </Text>
  );
};

export { Byline };
