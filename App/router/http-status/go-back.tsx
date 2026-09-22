import React from 'react';

// Router
import { useNavigate } from '@/router';

// Components
import { HyperLink, HyperLinkProps } from '@/components';

// Views
import { PATH } from '@/views/home';

const COPY = {
  back: 'Go Back',
  home: 'Go to Home Page',
};

const GoBack: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const to = (() => {
    if (document.referrer) {
      const url = new URL(document.referrer);

      return url.href.replace(url.origin, '');
    }

    return PATH;
  })();

  const action = document.referrer ? COPY.back : COPY.home;

  const onClick: HyperLinkProps['onClick'] = document.referrer
    ? (event) => {
        event.preventDefault();

        navigate(-1);
      }
    : undefined;

  return (
    <HyperLink
      onClick={onClick}
      level='confirm'
      lookLikeButton
      to={to}
      size='large'
      variant='secondary'
    >
      {action}
    </HyperLink>
  );
};

export { GoBack };
