import React from 'react';

// Router
import { useLocation, useNavigate } from '@/router';

// Components
import { HyperLink, HyperLinkProps } from '@/components';

const COPY = {
  back: 'Go Back',
};

const GoBack: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const url = document.referrer ? new URL(document.referrer) : undefined;
  const isSameOrigin = url?.origin === window.location.origin;

  // After a reload the referrer is this page, and linking to it goes nowhere.
  const referrer = isSameOrigin && url?.pathname === pathname ? undefined : url;

  // A router link cannot reach another origin, so step back in history instead.
  const onClick: HyperLinkProps['onClick'] = (event) => {
    if (!referrer || isSameOrigin) {
      return;
    }

    event.preventDefault();

    navigate(-1);
  };

  const to: HyperLinkProps['to'] =
    referrer && isSameOrigin
      ? {
          pathname: referrer.pathname,
          search: referrer.search,
          hash: referrer.hash,
        }
      : '..';

  return (
    <HyperLink
      level='confirm'
      lookLikeButton
      onClick={onClick}
      to={to}
      size='large'
      variant='secondary'
    >
      {COPY.back}
    </HyperLink>
  );
};

export { GoBack };
