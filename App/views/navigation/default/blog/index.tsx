import React from 'react';

import * as Tb from 'react-icons/tb';

// Components
import { HyperLink } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { PAGES } from '@/views/routes';

const Blog: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <HyperLink
      aria-label={t('blog')}
      block
      data-track='Header blog'
      lookLikeButton
      size='small'
      to={PAGES.blog}
      variant='tertiary'
    >
      <Tb.TbNotebook />
    </HyperLink>
  );
};

export { Blog };
