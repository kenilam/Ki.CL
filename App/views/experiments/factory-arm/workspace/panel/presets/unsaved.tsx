import React, { useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import {
  Animation,
  Button,
  Input,
  Layout,
  SheetFooter,
} from 'design/components';

// Context
import { useSetup } from '@/views/experiments/factory-arm/setup';

/**
 * Shows once the cell differs from the preset it started from: an obstacle
 * moved, added or taken away, or the cases set differently in Manual. It
 * saves the cell as it stands as a new preset, under the name given.
 */
const Unsaved: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');
  const { applied, cell, draft, edited, next, save } = useSetup();
  const [name, setName] = useState('');

  const changed =
    edited ||
    draft.stacks !== applied.stacks ||
    draft.pile.layers !== applied.pile.layers ||
    draft.pile.seed !== applied.pile.seed;

  if (!changed) {
    return null;
  }

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    save({ ...draft, obstacles: cell.current?.obstacles.current ?? [] }, name);
    setName('');
  };

  return (
    <Animation property='slide-from-bottom'>
      <SheetFooter is='footer'>
        <Layout
          alignItems='center'
          autoFlow='column'
          frames='1fr--max-content'
          gap='narrow'
        >
          <form
            aria-label={t('label', { context: 'unsaved' })}
            className='kicl-inline-size-full'
            onSubmit={submit}
          >
            <Input
              aria-label={t('label', { context: 'preset_name' })}
              onChange={(event) => setName(event.currentTarget.value)}
              placeholder={next}
              value={name}
            />
            <Button type='submit' size='small'>
              {t('action', { context: 'save' })}
            </Button>
          </form>
        </Layout>
      </SheetFooter>
    </Animation>
  );
};

export { Unsaved };
