import React from 'react';

// Libraries
import classNames from 'classnames';

// Router
import { useLocation, useNavigate } from '@/Router';

// Icons
import * as Icons from '@/Icons';

// Components
import {
  Animation,
  Heading,
  HyperLink,
  HyperLinkProps,
  Layout,
  Text,
} from '@/Components';

const CLASS_NAME = 'kicl--router--http-status--404';

const Status404: React.FunctionComponent = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const className = classNames(
    'kicl-text-align-center',
    'kicl--router--http-status',
    CLASS_NAME
  );

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
    <Animation>
      <Layout alignContent='center' autoFlow='row' justifyItems='center'>
        <section className={className}>
          <Layout
            alignContent='center'
            alignItems='center'
            justifyContent='center'
            justifyItems='center'
          >
            <Heading is='h1'>
              <Icons.Ri.RiLandscapeLine className='kicl-font-size-extreme' />
              Oops, something not right!
            </Heading>
          </Layout>
          <Text lookLike='h2'>404 - Page Not Found</Text>
          <Text>
            {'The page '}
            <Text is='span' lookLike='h3'>
              {pathname}
            </Text>
            {
              ' you are looking for might have been removed, had its name changed, or it temporarily unavailable.'
            }
          </Text>
          <HyperLink
            level='confirm'
            lookLikeButton
            onClick={onClick}
            to={to}
            size='large'
            variant='secondary'
          >
            Go Back
          </HyperLink>
        </section>
      </Layout>
    </Animation>
  );
};

export default Status404;
