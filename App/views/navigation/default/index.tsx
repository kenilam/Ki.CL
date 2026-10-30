import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { HyperLink, Navigation } from 'design/components';

// Views
import { Default as Account } from '@/views/account/default';
import { useAccount } from '@/views/account/use-account';
import { Language } from '@/views/navigation/language';

// Constants
import { ROUTES } from '@/views/navigation/constants';

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
      {ROUTES.map(({ key, to }) => (
        <HyperLink key={to} to={to}>
          {t(key)}
        </HyperLink>
      ))}
      <Language />
      {me ? <Account key='account' /> : null}
    </Navigation>
  );
};

export { Default };
