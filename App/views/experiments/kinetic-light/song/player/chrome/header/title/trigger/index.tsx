import React from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Button, Heading, PopoverTrigger } from 'design/components';

// Context
import { useGenerateContext } from '@/views/experiments/kinetic-light/context';
import { usePieceContext } from '@/views/experiments/kinetic-light/song/context';

const Trigger: React.FunctionComponent = () => {
  const { piece } = usePieceContext();
  const generate = useGenerateContext();

  return (
    <Heading is='h1' dense className='kicl-font-size-large'>
      <PopoverTrigger asChild>
        <Button
          after={
            generate.busy ? (
              <Tb.TbReload
                aria-hidden
                className={classNames('is-revolving', 'kicl-font-size')}
              />
            ) : (
              <Tb.TbChevronDown aria-hidden className='kicl-font-size' />
            )
          }
          unstyled
        >
          {piece.title}
        </Button>
      </PopoverTrigger>
    </Heading>
  );
};

export { Trigger };
