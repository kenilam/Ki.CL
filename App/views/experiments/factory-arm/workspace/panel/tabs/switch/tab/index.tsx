import React from 'react';

// Components
import { SegmentedItem } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { TABS } from '@/views/experiments/factory-arm/workspace/panel/tabs/constants';

type Props = { name: (typeof TABS)[number] };

const Tab: React.FunctionComponent<Props> = ({ name }) => {
  const { t } = useTranslation('factory-arm');

  return (
    <SegmentedItem value={name}>{t('tab', { context: name })}</SegmentedItem>
  );
};

export { Tab };
