import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { HyperLink, Navigation } from 'design/components';

// Views
import { Default as Account } from '@/views/account/default';
import { useAccount } from '@/views/account/use-account';

// Constants
import { ROUTES } from '@/views/navigation/constants';

const CLASS_NAME = 'kicl--views--navigation--default';

const Default: React.FunctionComponent = () => {
  const { me } = useAccount();

  const { t } = useTranslation();

  return (
    <Navigation
      aria-label={t('navigation.label')}
      autoFlow='column'
      className={CLASS_NAME}
    >
      {ROUTES.map(({ key, to }) => (
        <HyperLink key={to} to={to}>
          {t(key)}
        </HyperLink>
      ))}
      {/* Decided here, so an anonymous visitor gets no empty item. */}
      {me ? <Account key='account' /> : null}
    </Navigation>
  );
};

export { Default };
