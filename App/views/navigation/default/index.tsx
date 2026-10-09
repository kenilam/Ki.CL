import React from 'react';

// Components
import { HyperLink, Navigation } from 'design/components';

// Views
import { Default as Account } from '@/views/account/default';
import { useAccount } from '@/views/account/use-account';

// Constants
import { LABEL, ROUTES } from '@/views/navigation/constants';

const CLASS_NAME = 'kicl--views--navigation--default';

const Links = ROUTES.map(({ title, to }) => (
  <HyperLink key={to} to={to}>
    {title}
  </HyperLink>
));

const Default: React.FunctionComponent = () => {
  const { me } = useAccount();

  return (
    <Navigation aria-label={LABEL} autoFlow='column' className={CLASS_NAME}>
      {Links}
      {/* Decided here, so an anonymous visitor gets no empty item. */}
      {me ? <Account key='account' /> : null}
    </Navigation>
  );
};

export { Default };
