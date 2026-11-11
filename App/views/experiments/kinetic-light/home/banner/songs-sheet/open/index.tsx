import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Button, Layout } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { SHEET_ID } from '@/views/experiments/kinetic-light/home/banner/songs-sheet/constants';

const Open: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');

  return (
    <Layout>
      <Button
        before={<Tb.TbPlaylist aria-hidden />}
        popoverTarget={SHEET_ID}
        popoverTargetAction='show'
        size='small'
        variant='ghost'
      >
        {t('label', { context: 'songs' })}
      </Button>
    </Layout>
  );
};

export { Open };
