import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Button } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { SHEET_ID } from '@/views/experiments/kinetic-light/home/banner/songs-sheet/constants';

const Open: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');

  return (
    <Button
      before={<Tb.TbPlaylist aria-hidden />}
      popoverTarget={SHEET_ID}
      popoverTargetAction='show'
      size='small'
      variant='ghost'
    >
      {t('label', { context: 'songs' })}
    </Button>
  );
};

export { Open };
