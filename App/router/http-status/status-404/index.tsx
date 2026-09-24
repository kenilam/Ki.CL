import React from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import * as Icons from '@/icons';

// Components
import { Animation, Heading, Layout, Text } from '@/components';

// Partials
import { GoBack } from '@/router/http-status/go-back';
import { Message } from './message';

const CLASS_NAME = 'kicl--router--http-status--404';

const Status404: React.FunctionComponent = () => {
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
        alignItems='center'
        justifyContent='center'
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
              <Icons.Ri.RiLandscapeLine
                aria-hidden
                className='kicl-font-size-extreme'
              />
              Oops, something not right!
            </Text>
          </Layout>
          <Heading is='h1' lookLike='h2'>
            404 - Page Not Found
          </Heading>
          <Message />
          <GoBack />
        </section>
      </Layout>
    </Animation>
  );
};

export { Status404 };
