import React, { useEffect, useRef } from 'react';

// Components
import { Button } from 'design/components';

// Icons
import * as Tb from 'react-icons/tb';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { usePanelContext } from '@/views/experiments/factory-arm/panel-context';

// Constants
import { TABS } from '@/views/experiments/factory-arm/workspace/panel/tabs/constants';

/** Opens the log, which goes back to the tab it came from when pressed again. */
const Log: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');
  const { setTab, tab } = usePanelContext();
  // The tab the log goes back to.
  const back = useRef<(typeof TABS)[number]>('preset');

  useEffect(() => {
    if (tab !== 'log') {
      back.current = tab;
    }
  }, [tab]);

  const logging = tab === 'log';

  return (
    <Button
      aria-label={t('tab', { context: 'log' })}
      aria-pressed={logging}
      onClick={() => {
        setTab(logging ? back.current : 'log');
      }}
      size='small'
      variant={logging ? 'primary' : 'secondary'}
      level='confirm'
    >
      <Tb.TbFile aria-hidden />
    </Button>
  );
};

export { Log };
