import React from 'react';

// Router
import { useNavigate } from '@/router';

// Components
import { HyperLink, HyperLinkProps } from '@/components';

const COPY = {
  back: 'Go Back',
};

const GoBack: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const referrer = document.referrer ? new URL(document.referrer) : undefined;
  const isSameOrigin = referrer?.origin === window.location.origin;

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
