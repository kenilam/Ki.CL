import React from 'react';

// Components
import { Navigation } from 'design/components';

// Views
import { Default as Account } from './account';
import { Blog } from './blog';
import { Link } from './link';
import { Message } from './message';
import { Resume } from './resume';
import { useAccount } from '@/views/account/use-account';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { ROUTES } from '@/views/routes';

const CLASS_NAME = 'kicl--views--navigation--default';

const Default: React.FunctionComponent = () => {
  const { me } = useAccount();

  const { t } = useTranslation();

  return (
    <Navigation
      aria-label={t('main')}
      alignItems='center'
      autoFlow='column'
      className={CLASS_NAME}
    >
      {ROUTES.map(({ to }) => {
        return <Link key={to} to={to} />;
      })}
      <Resume key='resume' />
      <Blog key='blog' />
      <Message key='message' />
      {me ? <Account key='account' /> : null}
    </Navigation>
  );
};

export { Default };
