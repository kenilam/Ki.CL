import React, { useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Button, SheetFooter } from 'design/components';

// Context
import { type Setup, useSetup } from '@/views/experiments/factory-arm/setup';

// Partials
import { Confirm } from '@/views/experiments/factory-arm/panel/confirm';
import { Pile } from './pile';
import { Shapes } from './shapes';

/**
 * Sets the cell up by hand: obstacles go straight onto the stage, and the
 * cases are built as set here when the operator proceeds. The obstacles as
 * they stand now and the case settings save together as a preset.
 */
const Manual: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');
  const { cell, draft, proceed, save } = useSetup();

  const current = () => ({
    ...draft,
    obstacles: cell.current?.obstacles.current ?? [],
  });

  const [asking, setAsking] = useState(false);

  const start = (setup: Setup) => {
    setAsking(false);
    proceed(setup);
  };

  // While the arm is working, ask first.
  const go = () => (cell.current?.busy() ? setAsking(true) : start(current()));

  return (
    <>
      <Shapes />
      <Pile />

      {/* Full width each, the footer's row shares them out in equal halves. */}
      <SheetFooter>
        <Button
          className='kicl-inline-size-full'
          justifyContent='center'
          onClick={() => save(current())}
          size='small'
          variant='secondary'
        >
          {t('action', { context: 'save' })}
        </Button>
        <Button
          className='kicl-inline-size-full'
          justifyContent='center'
          onClick={go}
          size='small'
        >
          {t('action', { context: 'proceed' })}
        </Button>
      </SheetFooter>

      <Confirm
        onCancel={() => setAsking(false)}
        onConfirm={() => start(current())}
        open={asking}
      />
    </>
  );
};

export { Manual };
