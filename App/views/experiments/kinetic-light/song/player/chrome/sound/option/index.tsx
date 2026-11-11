import React from 'react';

// Components
import { SelectItem } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { VOICES } from '@/views/experiments/kinetic-light/constants';

type Props = { voice: (typeof VOICES)[number] };

const Option: React.FunctionComponent<Props> = ({ voice }) => {
  const { t } = useTranslation('kinetic-light');

  return (
    <SelectItem value={voice}>{t('voice', { context: voice })}</SelectItem>
  );
};

export { Option };
