import React from 'react';

// Components
import { Animation, Layout } from '@/Components';

// Partials
import Footer from './Sections/Footer';
import Hero from './Sections/Hero';
import Walkthrough from './Sections/Walkthrough';
import PartOne from './Sections/PartOne';
import PartTwo from './Sections/PartTwo';
import BuildPlan from './Sections/BuildPlan';

// Constants
import { CLASS_NAME } from './constants';

// Styles
import './Styles.scss';

const SystemDesign: React.FunctionComponent = () => {
  return (
    <Animation delay={300}>
      <article className={`${CLASS_NAME} kicl-inline-size-full`}>
        <div
          className={`${CLASS_NAME}__scroll-indicator kicl-position-fixed`}
        />
        <Hero />
        <Layout
          autoFlow='row'
          gap='wide'
          justifyContent='center'
          justifyItems='stretch'
        >
          <section className={`${CLASS_NAME}__body`}>
            <Walkthrough />
            <PartOne />
            <PartTwo />
            <BuildPlan />
            <Footer />
          </section>
        </Layout>
      </article>
    </Animation>
  );
};

export default SystemDesign;
