import React from 'react';

// Components
import {
  CardDescription,
  CardHeader,
  CardTitle,
  Layout,
} from 'design/components';

// Views
import { useAccount } from '@/views/account/use-account';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { ChangePassword } from './change-password';

const Header: React.FunctionComponent = () => {
  const { t } = useTranslation('me');
  const { me } = useAccount();

  return (
    <Layout gap='narrow' justifyItems='center'>
      <CardHeader className='kicl-text-align-center'>
        <CardTitle className='kicl-font-size' is='h1'>
          {t('title', { context: 'profile' })}
        </CardTitle>
        <CardDescription>
          {t('signed_in_as', { email: me?.email })}
        </CardDescription>
        <ChangePassword />
      </CardHeader>
    </Layout>
  );
};

export { Header };
