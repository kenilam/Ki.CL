import React from 'react';

// Components
import { SelectItem } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { BEATS } from '@/views/experiments/kinetic-light/constants';

type Props = { beat: (typeof BEATS)[number] };

const Option: React.FunctionComponent<Props> = ({ beat }) => {
  const { t } = useTranslation('kinetic-light');

  return <SelectItem value={beat}>{t('beat', { context: beat })}</SelectItem>;
};

export { Option };
