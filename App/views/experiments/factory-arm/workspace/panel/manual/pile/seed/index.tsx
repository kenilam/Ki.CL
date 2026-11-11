import React from 'react';

// Components
import { Button, Layout, ListItem, Text } from 'design/components';

// Icons
import * as Tb from 'react-icons/tb';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useDraftContext } from '@/views/experiments/factory-arm/draft-context';

const Seed: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');
  const { draft, setDraft } = useDraftContext();

  return (
    <Layout
      alignItems='center'
      autoFlow='column'
      frames='1fr--max-content'
      gap='narrow'
    >
      <ListItem>
        <Text is='span'>
          {t('label', { context: 'seed' })}{' '}
          <span className='kicl-font-family-mono'>{draft.pile.seed}</span>
        </Text>
        <Button
          before={<Tb.TbArrowsShuffle aria-hidden />}
          onClick={() =>
            setDraft({
              ...draft,
              pile: { ...draft.pile, seed: Math.floor(Math.random() * 1000) },
            })
          }
          size='small'
          variant='ghost'
        >
          {t('action', { context: 'random' })}
        </Button>
      </ListItem>
    </Layout>
  );
};

export { Seed };
