import React from 'react';

// Components
import { Animation, List } from 'design/components';

// Context
import { useSignOutContext } from '@/views/account/sign-out/context';

// Partials
import { Cancel } from './cancel';
import { Confirm } from './confirm';

const Actions: React.FunctionComponent = () => {
  const { pending } = useSignOutContext();

  return (
    <Animation in={!pending} property='slide-from-top' delay={300}>
      <List autoFlow='column' gap='narrow' justifyContent='center'>
        <Cancel />
        <Confirm />
      </List>
    </Animation>
  );
};

export { Actions };
