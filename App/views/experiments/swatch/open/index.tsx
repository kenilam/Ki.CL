import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Button } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useSpent } from '@/views/experiments/swatch/use-spent';

// Constants
import { MAKER } from '@/views/experiments/swatch/constants';

type Props = Pick<React.ComponentProps<typeof Button>, 'className'>;

const Open: React.FunctionComponent<Props> = ({ className }) => {
  const { t } = useTranslation('swatch');
  const spent = useSpent();

  return (
    <Button
      before={<Tb.TbSparkles aria-hidden />}
      className={className}
      popoverTarget={MAKER}
      size='small'
      variant='primary'
    >
      {t('action', { context: spent ? 'find' : 'make' })}
    </Button>
  );
};

export { Open };
