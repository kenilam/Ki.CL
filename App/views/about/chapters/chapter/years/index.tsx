import React from 'react';

import classNames from 'classnames';

import { Text } from 'design/components';
import { useTranslation } from 'design/hooks';

import type { Props } from '@/views/about/chapters/chapter';

const Years: React.FunctionComponent<Props> = ({ id }) => {
  const { t } = useTranslation('about');

  return (
    <Text
      className={classNames(
        'kicl-font-family-mono',
        'kicl-scroll-shift-narrow',
        'kicl-text-box-trim-start'
      )}
      dense
      is='span'
      lookLike='small'
      variant='secondary'
    >
      {t('years', { context: id })}
    </Text>
  );
};

export { Years };
