import React from 'react';

// Routes
import { Route as Origin } from '@/Router';

// Components
import { Heading, HyperLink } from '@/Components';

// Widgets
import { UnderConstruction } from '@/Widgets';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--view--home';

const Home = () => {
  return (
    <section className={CLASS_NAME}>
      <Heading className='kicl-font-size-extreme' is='h1'>
        Hello!
      </Heading>
      <UnderConstruction heading='Working on it'>
        <HyperLink to='mailto:hello@ki-cl.com'>Email me instead?</HyperLink>
      </UnderConstruction>
    </section>
  );
};

export default <Origin index element={<Home />} />;
