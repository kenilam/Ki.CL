import React from 'react';

import { Heading } from 'design/components';
import { useTranslation } from 'design/hooks';

import type { Props } from '@/views/about/resume/page/article/sections/section';

const Label: React.FunctionComponent<Props> = ({ id }) => {
  const { t } = useTranslation('resume');

  return (
    <Heading className='kicl-print-only' dense is='h2' lookLike='h6'>
      {t('title', { context: id })}
    </Heading>
  );
};

export { Label };
