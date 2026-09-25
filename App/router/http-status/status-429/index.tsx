import React from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import * as Icons from '@/icons';

// Components
import { Animation, Heading, Layout, Text } from '@/components';

// Partials
import { GoBack } from '@/router/http-status/go-back';

const CLASS_NAME = 'kicl--router--http-status--429';

type Props = {
  message: string;
  title?: string;
};

const Status429: React.FunctionComponent<Props> = ({ message, title }) => {
  const className = classNames(
    'kicl-text-align-center',
    'kicl--router--http-status',
    'kicl-max-inline-size-columns-12',
    CLASS_NAME
  );

  return (
    <Animation>
      <Layout
        alignContent='center'
        autoFlow='row'
        justifyItems='center'
        fullScreen
      >
        <section className={className}>
          <Layout
            alignContent='center'
            alignItems='center'
            justifyContent='center'
            justifyItems='center'
          >
            <Text lookLike='h1'>
              <Icons.Ri.RiTimerLine
                aria-hidden
                className='kicl-font-size-extreme'
              />
              Oops, something not right!
            </Text>
          </Layout>
          <Heading is='h1' lookLike='h2'>
            429 - Too Many Requests
          </Heading>
          {title ? (
            <Heading is='h2' lookLike='h4'>
              {title}
            </Heading>
          ) : null}
          <Text>{message}</Text>
          <GoBack />
        </section>
      </Layout>
    </Animation>
  );
};

export { Status429 };
