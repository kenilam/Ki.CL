import React from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import * as Icons from '@/icons';

// Components
import { Animation, Heading, Layout, Text } from '@/components';

// Partials
import { GoBack } from '@/router/http-status/go-back';

const CLASS_NAME = 'kicl--router--http-status--500';

type Props = {
  message: string;
  title?: string;
};

const Status500: React.FunctionComponent<Props> = ({ message, title }) => {
  const className = classNames(
    'kicl-text-align-center',
    'kicl--router--http-status',
    CLASS_NAME
  );

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
              <Icons.Ri.RiBug2Line
                aria-hidden
                className='kicl-font-size-extreme'
              />
              Oops, something not right!
            </Heading>
          </Layout>
          <Text lookLike='h2'>500 - Internal Server Error</Text>
          {title ? <Text lookLike='h4'>{String(title)}</Text> : null}
          <Text>{message}</Text>
          <GoBack />
        </section>
      </Layout>
    </Animation>
  );
};

export { Status500 };
