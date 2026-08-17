import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { AnimatedText, Animation, Heading, Layout } from '@/Components';

// Constants
import { CLASS_NAME } from '../constants';

const Hero: React.FunctionComponent = () => {
  return (
    <section className={`${CLASS_NAME}__hero`}>
      <Animation delay={300} property='zoom-out'>
        <Layout
          alignContent='center'
          alignItems='center'
          autoFlow='row'
          fullScreen
          gap='none'
          justifyContent='center'
          justifyItems='center'
        >
          <header
            className={classNames(
              'kicl-text-align-center',
              'kicl-position-relative'
            )}
            role='banner'
          >
            <Heading className='kicl-font-size-largest' is='h2'>
              Pika Creative Platform
            </Heading>
            <AnimatedText
              delay={1000}
              dense
              duration='slower'
              easing='ease-sine-in'
              property='slide-from-bottom'
            >
              Keni · Ki.CL · August 2026
            </AnimatedText>
          </header>
        </Layout>
      </Animation>
    </section>
  );
};

export default Hero;
