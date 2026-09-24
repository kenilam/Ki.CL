import React from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import * as Icons from '@/icons';

// Components
import { Animation, Heading, Layout, Text } from '@/components';

// Partials
import { GoBack } from '@/router/http-status/go-back';

const CLASS_NAME = 'kicl--router--http-status--204';

type Props = {
  message: string;
  title?: string;
};

const Status204: React.FunctionComponent<Props> = ({ message, title }) => {
  const className = classNames(
    'kicl-text-align-center',
    'kicl--router--http-status',
    'kicl-max-inline-size-columns-12',
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
            <Text lookLike='h1'>
              <Icons.Ri.RiFileUnknowLine
                aria-hidden
                className='kicl-font-size-extreme'
              />
              Oops, something not right!
            </Text>
          </Layout>
          <Heading is='h1' lookLike='h2'>
            204 - No Content
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

export { Status204 };
