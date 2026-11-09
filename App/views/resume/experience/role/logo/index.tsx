import React from 'react';

// Icons
import type { IconType } from 'react-icons';
import * as Si from 'react-icons/si';

// Routes
import { useParams } from 'design/router';

// Components
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'design/components';

// Content
import { findVersion, type Organisation } from '@/views/resume/content';

// Context
import { useVersion } from '@/views/resume/context';

type Props = {
  index: number;
};

const LOGOS: Record<Organisation, IconType> = {
  apple: Si.SiApple,
  ebay: Si.SiEbay,
  indeed: Si.SiIndeed,
  rakuten: Si.SiRakuten,
  tesla: Si.SiTesla,
};

const Logo: React.FunctionComponent<Props> = ({ index }) => {
  const { version: slug } = useParams();

  const { experience } = useVersion();

  const id = findVersion(slug)?.experience[index].organisation;

  if (!id) {
    return null;
  }

  const Icon = LOGOS[id];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label={experience[index].organisation}
          className='kicl-border-radius-full kicl-print-hidden'
          size='small'
          variant='secondary'
        >
          <Icon aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent placement='block-end-start'>
        <Icon aria-hidden className='kicl-font-size-extreme' />
      </PopoverContent>
    </Popover>
  );
};

export { Logo };
