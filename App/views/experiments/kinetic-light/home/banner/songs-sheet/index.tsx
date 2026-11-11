import React, { useState } from 'react';

// Components
import { Heading, Sheet } from 'design/components';

// Context
import { useSongsContext } from '@/views/experiments/kinetic-light/context';

// Partials
import { Open } from './open';
import { Songs } from '@/views/experiments/kinetic-light/songs';

// Hooks
import { useTranslation } from 'design/hooks';
import { useCloseOnCover } from './use-close-on-cover';

// Constants
import { SHEET_ID } from './constants';

const SongsSheet: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');
  const { examples, songs } = useSongsContext();
  const [sheet, setSheet] = useState<HTMLElement | null>(null);

  useCloseOnCover(sheet);

  if (!examples.length && !songs.length) {
    return null;
  }

  return (
    <>
      <Open />
      <Sheet
        defaultOpen
        header={<Heading is='h3'>{t('label', { context: 'songs' })}</Heading>}
        id={SHEET_ID}
        popover='auto'
        ref={setSheet}
        variant='secondary'
      >
        <Songs />
      </Sheet>
    </>
  );
};

export { SongsSheet };
