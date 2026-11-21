import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Button } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { MAKER } from '@/views/experiments/swatch/constants';

type Props = Pick<React.ComponentProps<typeof Button>, 'className'>;

const Open: React.FunctionComponent<Props> = ({ className }) => {
  const { t } = useTranslation('swatch');

  return (
    <Button
      before={<Tb.TbSparkles aria-hidden />}
      className={className}
      popoverTarget={MAKER}
      size='small'
      variant='primary'
    >
      {t('action', { context: 'find' })}
    </Button>
  );
};

export { Open };
