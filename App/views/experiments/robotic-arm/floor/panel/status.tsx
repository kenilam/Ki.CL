import React from 'react';

// Components
import { Animation, Badge, BadgeLabel, Text } from '@/components';

// Brains
import type { Mode, Status } from 'arm/brains';

// Constants
import { COPY } from './constants';

type Props = {
  mode: Mode;
  status: Status | null;
};

const Status: React.FunctionComponent<Props> = ({ mode, status }) => {
  let state = COPY.brains[status?.state || 'connecting'];
  let content = '';

  if (status?.roundTrip) {
    state = `${String(Math.round(status.roundTrip)).padStart(3, '0')}ms`;
    content = COPY.brains.roundTrip;
  }

  return (
    <Animation in={mode === 'physical'} property='slide-from-top' delay={0}>
      <Badge size='small' variant='outline' level='confirm'>
        <BadgeLabel>{COPY.brains.status}</BadgeLabel>
        <Text className='kicl-font-family-mono' dense is='span'>
          {state}
          {content}
        </Text>
      </Badge>
    </Animation>
  );
};

export { Status };
