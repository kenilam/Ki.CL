import React, { useState } from 'react';

// Components
import { Button, CardContent, Layout, SheetFooter } from 'design/components';

// Context
import {
  type Setup,
  useSetup,
  WIDE,
} from '@/views/experiments/factory-arm/setup';

// Partials
import { Confirm } from '@/views/experiments/factory-arm/panel/confirm';
import { Pile } from './pile';
import { Shapes } from './shapes';

// Constants
import { COPY } from '@/views/experiments/factory-arm/constants';

/**
 * Sets the cell up by hand: obstacles go straight onto the stage, and the
 * cases are built as set here when the operator proceeds. The obstacles as
 * they stand now and the case settings save together as a preset.
 */
const Manual: React.FunctionComponent = () => {
  const { cell, draft, proceed, save, setOpen } = useSetup();

  const current = () => ({
    ...draft,
    obstacles: cell.current?.obstacles.current ?? [],
  });

  const [asking, setAsking] = useState(false);

  // On small screens the panel covers the stage, so it folds away to show the run.
  const start = (setup: Setup) => {
    setAsking(false);
    proceed(setup);
    setOpen(matchMedia(WIDE).matches);
  };

  // While the arm is working, ask first.
  const go = () => (cell.current?.busy() ? setAsking(true) : start(current()));

  return (
    <>
      <Layout alignContent='start' gap='wide'>
        <CardContent>
          <Shapes />
          <Pile />
        </CardContent>
      </Layout>

      {/* Full width each, the footer's row shares them out in equal halves. */}
      <SheetFooter>
        <Button
          className='kicl-inline-size-full'
          justifyContent='center'
          onClick={() => save(current())}
          size='small'
          variant='secondary'
        >
          {COPY.panel.save}
        </Button>
        <Button
          className='kicl-inline-size-full'
          justifyContent='center'
          onClick={go}
          size='small'
        >
          {COPY.panel.proceed}
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
