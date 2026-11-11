import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { HyperLink } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { ARTICLE_ID } from '@/views/experiments/image-agent/start/constants';

const More: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const label = t('title', { context: 'how_it_was_made' });

  return (
    <HyperLink
      aria-label={label}
      className='kicl-margin-inline-auto'
      lookLikeButton
      size='large'
      title={label}
      to={`#${ARTICLE_ID}`}
      variant='secondary'
    >
      <Tb.TbChevronDown aria-hidden />
    </HyperLink>
  );
};

export { More };
