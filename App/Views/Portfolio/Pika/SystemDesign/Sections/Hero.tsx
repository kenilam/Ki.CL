import React from 'react';

// Libraries
import classNames from 'classnames';

import { Ri } from '@/Icons';

// Components
import { AnimatedText, Animation, Heading, Layout } from '@/Components';
import { Link } from '@/Router';

// Constants
import { CLASS_NAME } from '@/Views/Portfolio/Pika/SystemDesign/constants';

const Hero: React.FunctionComponent = () => {
  return (
    <section className={`${CLASS_NAME}__hero`}>
      <Animation delay={300} property='zoom-out'>
        <Layout
          alignContent='center'
          alignItems='center'
          autoFlow='row'
          fullScreen
          gap='narrow'
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
            <Heading className='kicl-font-size-largest' dense is='h2'>
              Pika Creative Platform
            </Heading>
            <Layout
              alignContent='center'
              alignItems='center'
              autoFlow='column'
              gap='narrowest'
              justifyContent='center'
              justifyItems='center'
            >
              <Link
                to='https://docs.google.com/document/d/1-UqIfuYGPwJj-x11e71wVqWr22EcjP81L-VGr-1HoGo/edit?tab=t.0#heading=h.b06blv3gdzee'
                target='_blank'
              >
                <Ri.RiFile4Line />
                Brief
              </Link>
            </Layout>
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
