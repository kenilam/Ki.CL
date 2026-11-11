import React from 'react';

// Components
import { Card, Spinner } from 'design/components';

// Context
import { usePasswordChangeContext } from '@/views/context';

// Partials
import { Footer } from './footer';
import { PasswordForm } from './form';
import { Header } from './header';

const Password: React.FunctionComponent = () => {
  const { stage } = usePasswordChangeContext();

  const busy = stage === 'loading' || stage === 'waiting' || stage === 'saving';

  return (
    <Card is='section' size='max' variant='secondary'>
      <Header />
      {stage === 'idle' ? <PasswordForm /> : null}
      {busy ? (
        <Spinner className='kicl-justify-self-center' in position='inline' />
      ) : null}
      <Footer />
    </Card>
  );
};

export { Password };
