import React from 'react';

// Libraries
import classNames from 'classnames';

// Router
import { useNavigate } from '@/Router';

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

// Views
import { PATH } from '@/Views/Home';

const CLASS_NAME = 'kicl--router--http-status--500';

type Props = {
  message: string;
  title?: string;
};

const Status500: React.FunctionComponent<Props> = ({ message, title }) => {
  const navigate = useNavigate();

  const className = classNames(
    'kicl-text-align-center',
    'kicl--router--http-status',
    CLASS_NAME
  );

  const to = (() => {
    if (document.referrer) {
      const url = new URL(document.referrer);

      return url.href.replace(url.origin, '');
    }

    return PATH;
  })();

  const action = document.referrer ? 'Go Back' : 'Go to Home Page';

  const onClick: HyperLinkProps['onClick'] = document.referrer
    ? (event) => {
        event.preventDefault();

        navigate(-1);
      }
    : undefined;

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
              <Icons.Ri.RiBug2Line className='kicl-font-size-extreme' />
              Oops, something not right!
            </Heading>
          </Layout>
          <Text lookLike='h2'>500 - Internal Server Error</Text>
          {title ? <Text lookLike='h4'>{String(title)}</Text> : null}
          <Text>{message}</Text>
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
        </section>
      </Layout>
    </Animation>
  );
};

export default Status500;
