import React, { useId, useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Icons
import * as Bs from 'react-icons/bs';

// Components
import { Button, Heading, Layout, Sheet } from 'design/components';

// Context
import { useKineticLightContext } from '@/views/experiments/kinetic-light/context';

// Partials
import { Songs } from '@/views/experiments/kinetic-light/songs';

// Hooks
import { useCloseOnCover } from './use-close-on-cover';

const SongsSheet: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');
  const { examples, songs } = useKineticLightContext();
  const id = useId();
  const [sheet, setSheet] = useState<HTMLElement | null>(null);
  const title = t('label', { context: 'songs' });

  useCloseOnCover(sheet);

  return examples.length || songs.length ? (
    <>
      <Layout>
        <Button
          before={<Bs.BsMusicNoteList aria-hidden />}
          popoverTarget={id}
          popoverTargetAction='show'
          size='small'
          variant='ghost'
        >
          {title}
        </Button>
      </Layout>
      <Sheet
        defaultOpen
        header={<Heading is='h3'>{title}</Heading>}
        id={id}
        popover='auto'
        ref={setSheet}
        variant='secondary'
      >
        <Songs />
      </Sheet>
    </>
  ) : null;
};

export { SongsSheet };
