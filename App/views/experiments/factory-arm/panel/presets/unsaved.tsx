import React, { useState } from 'react';

// Components
import { Button, CardFooter, Input, Layout } from '@/components';

// Context
import { useSetup } from '@/views/experiments/factory-arm/setup';

// Constants
import { CLASS_NAME, COPY } from '@/views/experiments/factory-arm/constants';

/**
 * Shows once the cell differs from the preset it started from: an obstacle
 * moved, added or taken away, or the cases set differently in Manual. It
 * saves the cell as it stands as a new preset, under the name given.
 */
const Unsaved: React.FunctionComponent = () => {
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
    <CardFooter
      className={`${CLASS_NAME}__panel-foot kicl-position-sticky kicl-inset-block-end-0`}
      is='footer'
    >
      <form
        aria-label={COPY.panel.unsaved}
        className='kicl-inline-size-full'
        onSubmit={submit}
      >
        <Layout
          alignItems='center'
          autoFlow='column'
          frames='1fr--max-content'
          gap='narrow'
        >
          <div>
            <Input
              aria-label={COPY.panel.name}
              onChange={(event) => setName(event.currentTarget.value)}
              placeholder={next}
              value={name}
            />
            <Button type='submit' size='small'>
              {COPY.panel.save}
            </Button>
          </div>
        </Layout>
      </form>
    </CardFooter>
  );
};

export { Unsaved };
