import React from 'react';

// Components
import { Card } from 'design/components';

// Views
import { useAccount } from '@/views/account/use-account';

// Partials
import { Delete } from './delete';
import { Form } from './form';
import { Header } from './header';

const Profile: React.FunctionComponent = () => {
  const { me } = useAccount();

  // The gate above only renders this for a signed-in user.
  if (!me) {
    return null;
  }

  return (
    <>
      <Card is='section' size='max' variant='secondary'>
        <Header />
        <Form />
      </Card>
      <Delete />
    </>
  );
};

export { Profile };
