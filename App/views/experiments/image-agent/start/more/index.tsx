import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Icons
import * as Bs from 'react-icons/bs';

// Components
import { HyperLink } from 'design/components';

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
      <Bs.BsChevronDown aria-hidden />
    </HyperLink>
  );
};

export { More };
