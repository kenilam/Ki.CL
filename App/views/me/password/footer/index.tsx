import React from 'react';

// Components
import { Animation, CardFooter } from 'design/components';

// Context
import { usePasswordChangeContext } from '@/views/context';

// Partials
import { Again } from './again';
import { Back } from './back';

const Footer: React.FunctionComponent = () => {
  const { stage } = usePasswordChangeContext();

  if (!['done', 'expired', 'failed'].includes(stage)) {
    return null;
  }

  return (
    <Animation property='slide-from-bottom'>
      <CardFooter justifyContent='center'>
        <Again />
        <Back />
      </CardFooter>
    </Animation>
  );
};

export { Footer };
