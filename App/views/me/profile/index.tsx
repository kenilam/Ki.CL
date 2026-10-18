import React from 'react';

import { useTranslation } from 'react-i18next';

// Components
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  HyperLink,
  Layout,
} from 'design/components';

// Views
import { useAccount } from '@/views/account/use-account';
import { PATH as PASSWORD_PATH } from '@/views/me/password/constants';

// Partials
import { Delete } from './delete';
import { Form } from './form';

const Profile: React.FunctionComponent = () => {
  const { t } = useTranslation('me');
  const { me } = useAccount();

  // The gate above only renders this for a signed-in user.
  if (!me) {
    return null;
  }

  return (
    <>
      <Card size='max' variant='secondary'>
        <Layout gap='narrow' justifyItems='center'>
          <CardHeader className='kicl-text-align-center'>
            <CardTitle className='kicl-font-size' is='h1'>
              {t('title', { context: 'profile' })}
            </CardTitle>
            <CardDescription>
              {t('signed_in_as', { email: me.Email })}
            </CardDescription>
            <HyperLink
              lookLikeButton
              size='small'
              to={PASSWORD_PATH}
              variant='ghost'
            >
              {t('change_password')}
            </HyperLink>
          </CardHeader>
        </Layout>
        <Form me={me} />
      </Card>
      <Delete />
    </>
  );
};

export { Profile };
