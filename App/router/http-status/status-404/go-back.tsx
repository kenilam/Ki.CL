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

  const Referer = document.referrer ? new URL(document.referrer) : undefined;

  const onClick: HyperLinkProps['onClick'] = (event) => {
    if (!Referer?.origin || Referer?.origin === window.location.origin) {
      return;
    }

    event.preventDefault();

    navigate(-1);
  };

  const to: HyperLinkProps['to'] = {
    pathname: Referer?.pathname || '..',
    search: Referer?.search,
    hash: Referer?.hash,
  };

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
