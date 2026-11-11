import React from 'react';

// Components
import { HyperLink } from 'design/components';

// Catalog
import { ATTRIBUTION } from '@/views/experiments/music-visualiser/catalog';

// Hooks
import { useTranslation } from 'design/hooks';

const Attribution: React.FunctionComponent = () => {
  const { t } = useTranslation('music-visualiser');

  return <HyperLink to={ATTRIBUTION.url}>{t('attribution')}</HyperLink>;
};

export { Attribution };
