import React from 'react';

// Components
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  HyperLink,
} from 'design/components';

// Views
import { useAccount } from '@/views/account/use-account';
import { PATH as PASSWORD_PATH } from '@/views/me/password/constants';

// Partials
import { Delete } from './delete';
import { Form } from './form';

// Constants
import { COPY } from './constants';

const Profile: React.FunctionComponent = () => {
  const { me } = useAccount();

  // The gate above only renders this for a signed-in user.
  if (!me) {
    return null;
  }

  return (
    <>
      <Card className='kicl-inline-size-xl'>
        <CardHeader>
          <CardTitle className='kicl-font-size' is='h1'>
            {COPY.title}
          </CardTitle>
          <CardDescription>
            {COPY.signedInAs} {me.Email}
          </CardDescription>
          <HyperLink
            lookLikeButton
            size='small'
            to={PASSWORD_PATH}
            variant='ghost'
          >
            {COPY.changePassword}
          </HyperLink>
        </CardHeader>
        <Form me={me} />
      </Card>
      <Delete />
    </>
  );
};

export { Profile };
