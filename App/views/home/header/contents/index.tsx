import React from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import * as Icons from 'design/icons';

// Components
import { AnimatedText, Heading, HyperLink, Layout } from 'design/components';

const Contents: React.FunctionComponent = () => {
  return (
    <>
      <Heading
        className={classNames('kicl-font-size-largest', 'kicl-z-index-raised')}
        is='h1'
      >
        {/* A box of its own, so the logo isn't set on the heading's text line. */}
        <Layout display='inline-grid'>
          <HyperLink aria-label='Ki.CL home' to='/' unstyled>
            <Icons.Logo />
          </HyperLink>
        </Layout>
      </Heading>
      <Layout gap='narrow'>
        <section>
          <AnimatedText
            delay={1000}
            dense
            duration='slower'
            easing='ease-sine-in'
            property='slide-from-bottom'
            className={classNames('kicl-z-index-raised')}
          >
            Personal projects are where curiosity becomes craft.
          </AnimatedText>
          <AnimatedText
            delay={1000}
            dense
            duration='slower'
            easing='ease-sine-in'
            property='slide-from-bottom'
            className={classNames('kicl-z-index-raised')}
          >
            This is my own little lab for imagining what's possible and building
            it into existence.
          </AnimatedText>
        </section>
      </Layout>
    </>
  );
};

export { Contents };
