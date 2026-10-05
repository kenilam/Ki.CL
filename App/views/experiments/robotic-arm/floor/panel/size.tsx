import React, { useId, useState } from 'react';

// Components
import { Button, Input, Layout, Text } from 'design/components';

// World
import { LIMITS, type Floor } from '@/views/experiments/robotic-arm/floor/world';

// Constants
import { COPY } from './constants';

type Props = { size: Floor; onSizeChange: (size: Floor) => void };

/** How many arms and AMRs the floor has; building throws the old floor away. */
const Size: React.FunctionComponent<Props> = ({ onSizeChange, size }) => {
  const [draft, setDraft] = useState(size);
  const id = useId();

  return (
    <Layout gap='narrow'>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSizeChange({ ...draft });
        }}
      >
        {(['arms', 'amrs'] as const).map((key) => (
          <>
            <Layout autoFlow='column' frames='1fr--max-content' gap='narrow'>
              <fieldset>
                <label
                  className='kicl-font-size-small'
                  htmlFor={`${id}-${key}`}
                >
                  {COPY.size[key]}
                </label>
                <Text
                  is='span'
                  className='kicl-font-size-small'
                  variant='secondary'
                >
                  {draft[key]}
                </Text>
              </fieldset>
            </Layout>
            <Input
              className='kicl-padding-none'
              id={`${id}-${key}`}
              max={LIMITS[key]}
              min={key === 'arms' ? 1 : 0}
              onChange={(event) =>
                setDraft({ ...draft, [key]: Number(event.target.value) })
              }
              type='range'
              value={draft[key]}
            />
          </>
        ))}
        <Button size='small' type='submit' variant='secondary' level='info'>
          {COPY.size.build}
        </Button>
      </form>
    </Layout>
  );
};

export { Size };
