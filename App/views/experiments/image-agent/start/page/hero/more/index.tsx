import React from 'react';

// Components
import { MoreLink } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { ARTICLE_ID } from '@/views/experiments/image-agent/start/constants';

const More: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <MoreLink
      className='kicl-margin-inline-auto'
      label={t('title', { context: 'how_it_was_made' })}
      to={`#${ARTICLE_ID}`}
    />
  );
};

export { More };
