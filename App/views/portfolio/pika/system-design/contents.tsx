import React from 'react';

// Components
import { Animation, Layout } from '@/components';

// Partials
import { Footer } from './sections/footer';
import { Hero } from './sections/hero';
import { Walkthrough } from './sections/walkthrough';
import { PartOne } from './sections/part-one';
import { PartTwo } from './sections/part-two';
import { Simulation } from './sections/simulation';
import { AgentSimulation } from './sections/agent-simulation';
import { AnchorNav } from './sections/anchor-nav';
import { BuildPlan } from './sections/build-plan';

// Constants
import { CLASS_NAME } from './constants';

// Styles
import './styles.scss';

const SystemDesign: React.FunctionComponent = () => {
  return (
    <Animation delay={300}>
      <article className={`${CLASS_NAME} kicl-inline-size-full`}>
        <div
          className={`${CLASS_NAME}__scroll-indicator kicl-position-fixed`}
        />
        <Hero />
        <AnchorNav />
        <Layout
          autoFlow='row'
          gap='wide'
          justifyContent='center'
          justifyItems='stretch'
        >
          <section className={`${CLASS_NAME}__body`}>
            <Walkthrough />
            <PartOne />
            <Simulation />
            <PartTwo />
            <AgentSimulation />
            <BuildPlan />
            <Footer />
          </section>
        </Layout>
      </article>
    </Animation>
  );
};

export { SystemDesign };
