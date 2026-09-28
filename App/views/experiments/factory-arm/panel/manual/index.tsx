import React, { useState } from 'react';

// Components
import { Button, CardContent, CardFooter, Layout } from '@/components';

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
import { CLASS_NAME, COPY } from '@/views/experiments/factory-arm/constants';

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
      <CardContent className={`${CLASS_NAME}__panel-body`}>
        <Layout gap='wide'>
          <div>
            <Shapes />
            <Pile />
          </div>
        </Layout>
      </CardContent>

      <CardFooter
        className={`${CLASS_NAME}__panel-foot kicl-position-sticky kicl-inset-block-end-0`}
      >
        {/* Two equal halves, whatever their labels; stacked on phones. */}
        <Layout columns gap='narrow'>
          <div className='kicl-inline-size-full'>
            <Layout span={6}>
              <Button
                className='kicl-inline-size-full'
                justifyContent='center'
                onClick={() => save(current())}
                size='small'
                variant='secondary'
              >
                {COPY.panel.save}
              </Button>
            </Layout>
            <Layout span={6}>
              <Button
                className='kicl-inline-size-full'
                justifyContent='center'
                onClick={go}
                size='small'
              >
                {COPY.panel.proceed}
              </Button>
            </Layout>
          </div>
        </Layout>
      </CardFooter>

      <Confirm
        onCancel={() => setAsking(false)}
        onConfirm={() => start(current())}
        open={asking}
      />
    </>
  );
};

export { Manual };
