import React from 'react';

// Components
import { Card as Origin } from 'design/components';

// Context
import { useConfirmContext } from '@/views/me/password/confirm/context';

// Partials
import { Header } from './header';
import { Invalid } from './invalid';
import { Submit } from './submit';

const Card: React.FunctionComponent = () => {
  const { invalid } = useConfirmContext();

  if (invalid) {
    return <Invalid />;
  }

  return (
    <Origin is='section' size='max' variant='secondary'>
      <Header />
      <Submit />
    </Origin>
  );
};

export { Card };
