import React, { useState } from 'react';

// Icons
import * as Bs from 'react-icons/bs';

// Components
import {
  Button,
  Heading,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from 'design/components';

// Routes
import { useParams } from 'design/router';

// Context
import { useKineticLightContext } from '@/views/experiments/kinetic-light/context';
import { usePlayerContext } from '@/views/experiments/kinetic-light/song/player/context';

// Partials
import { Generate } from '@/views/experiments/kinetic-light/song/player/chrome/title/generate';
import { Songs } from '@/views/experiments/kinetic-light/songs';

// Constants
import type { PARAM } from '@/views/experiments/kinetic-light/constants';

const Title: React.FunctionComponent = () => {
  const { piece } = usePlayerContext();
  const { examples, generate, songs } = useKineticLightContext();
  const { id } = useParams<typeof PARAM>();
  const [openFor, setOpenFor] = useState<string>();

  return (
    <Popover
      onOpenChange={(open) => setOpenFor(open ? id : undefined)}
      open={openFor === id}
    >
      <Heading is='h1' dense className='kicl-font-size-large'>
        <PopoverTrigger asChild>
          <Button
            after={
              generate.busy ? (
                <Bs.BsArrowClockwise aria-hidden className='is-revolving' />
              ) : (
                <Bs.BsChevronDown aria-hidden />
              )
            }
            unstyled
          >
            {piece.title}
          </Button>
        </PopoverTrigger>
      </Heading>
      <PopoverContent
        className='kicl-max-inline-size-columns-4'
        forceMount
        placement='block-start-start'
        variant='secondary'
      >
        <Generate />
        {examples.length || songs.length ? (
          <>
            <Separator className='kicl-margin-block-narrow' is='hr' />
            <Songs />
          </>
        ) : null}
      </PopoverContent>
    </Popover>
  );
};

export { Title };
