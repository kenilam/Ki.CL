import React, { useState } from 'react';

// Components
import { Layout, Popover, PopoverContent, Separator } from 'design/components';

// Routes
import { useParams } from 'design/router';

// Context
import { useSongsContext } from '@/views/experiments/kinetic-light/context';

// Partials
import { Generate } from './generate';
import { Trigger } from './trigger';
import { Songs } from '@/views/experiments/kinetic-light/songs';

// Constants
import type { PARAM } from '@/views/experiments/kinetic-light/constants';

const Title: React.FunctionComponent = () => {
  const { examples, songs } = useSongsContext();
  const { id } = useParams<typeof PARAM>();
  const [openFor, setOpenFor] = useState<string>();

  return (
    <Popover
      onOpenChange={(open) => {
        setOpenFor(open ? id : undefined);
      }}
      open={openFor === id}
    >
      <Trigger />
      <Layout>
        <PopoverContent
          className='kicl-max-inline-size-columns-4'
          forceMount
          placement='block-start-start'
          variant='secondary'
        >
          <Generate />
          {examples.length || songs.length ? (
            <>
              <Separator is='hr' />
              <Songs />
            </>
          ) : null}
        </PopoverContent>
      </Layout>
    </Popover>
  );
};

export { Title };
