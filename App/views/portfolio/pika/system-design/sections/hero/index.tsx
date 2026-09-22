import React from 'react';

// Libraries
import classNames from 'classnames';

import { Ri } from '@/icons';

// Components
import { Animation, Heading, HyperLink, Layout } from '@/components';

// Partials
import { Byline } from './byline';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as SYSTEM_DESIGN } from '@/views/portfolio/pika/system-design/constants';

const CLASS_NAME = `${SYSTEM_DESIGN}__hero`;

const BRIEF =
  'https://docs.google.com/document/d/1-UqIfuYGPwJj-x11e71wVqWr22EcjP81L-VGr-1HoGo/edit?tab=t.0#heading=h.b06blv3gdzee';

const Hero: React.FunctionComponent = () => {
  return (
    <section className={classNames(CLASS_NAME, 'kicl-inline-size-full')}>
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
              'kicl-padding-inline-extreme',
              'kicl-position-relative',
              'kicl-text-align-center'
            )}
          >
            <Heading className='kicl-font-size-largest' dense is='h1'>
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
              <HyperLink before={<Ri.RiFile4Line aria-hidden />} to={BRIEF}>
                Brief
              </HyperLink>
            </Layout>
            <Byline />
          </header>
        </Layout>
      </Animation>
    </section>
  );
};

export { CLASS_NAME, Hero };
