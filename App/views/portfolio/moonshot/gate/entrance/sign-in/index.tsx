import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Animation, Card, Frame, Layout } from 'design/components';

// Widgets
import { Background } from 'design/widgets';

// Views
import { CONTENT_DELAY, FRAME_DELAY } from '@/views/constants';

// Partials
import { Form } from './form';
import { Header } from './header';

const SignIn: React.FunctionComponent = () => {
  return (
    <Layout
      alignContent='center'
      alignItems='center'
      autoFlow='row'
      justifyContent='center'
      justifyItems='center'
    >
      {/* Grows, with room above and below the card, for a window shorter than the form. */}
      <Frame delay={FRAME_DELAY} grow>
        <section
          className={classNames(
            'kicl-padding-block-frame',
            'kicl-position-relative'
          )}
        >
          <Animation delay={CONTENT_DELAY}>
            <Background />
          </Animation>
          <Card is='section' size='max' variant='secondary'>
            <Header />
            <Form />
          </Card>
        </section>
      </Frame>
    </Layout>
  );
};

export { SignIn };
