import React, { useRef } from 'react';

// Components
import { Heading, Layout, Text } from '@/Components';

// Diagrams
import services from '../Diagrams/services';

// Partials
import SimulationPlayer, { type PlayerStep } from './SimulationPlayer';

/**
 * One Character Creator job through the Part 1 architecture — including the
 * failure the design is built around: a provider timeout, an idempotent
 * retry, a circuit-break failover, and per-task settlement.
 */
const STEPS: PlayerStep[] = [
  {
    log: 'POST /jobs — character-creator @ v4',
    active: ['web', 'gw'],
    chip: '120 held',
  },
  {
    log: 'validate inputs · moderation pre-check',
    active: ['gw', 'jobs', 'mod'],
  },
  {
    log: 'RunAppWorkflow started — DAG expanded into 5 shot tasks',
    active: ['jobs', 'orch', 'pg'],
  },
  { log: 'shot 1 → queued', active: ['orch', 'q'], dot: [0, 'queued'] },
  {
    log: 'shot 1 → rendering on provider A',
    active: ['q', 'wk', 'pad'],
    dot: [0, 'running'],
  },
  {
    log: 'shot 1 done — asset stored, content-addressed',
    active: ['wk', 's3'],
    dot: [0, 'done'],
  },
  { log: 'progress event → SSE — 1/5 rendered', active: ['ev', 'rt', 'web'] },
  {
    log: 'shot 2 done — 2/5 rendered',
    active: ['wk', 's3', 'ev'],
    dot: [1, 'done'],
  },
  {
    log: 'shot 3 → rendering on provider A',
    active: ['q', 'wk', 'pad'],
    dot: [2, 'running'],
  },
  {
    log: 'provider timeout — attempt 1 classified retryable',
    failed: ['pad'],
    dot: [2, 'retry'],
  },
  {
    log: 'backoff with jitter → retry, same idempotency key',
    active: ['wk'],
    dot: [2, 'retry'],
  },
  {
    log: 'provider A error rate trips circuit — failover to provider B',
    failed: ['pad'],
    dot: [2, 'retry'],
  },
  {
    log: 'shot 3 done on provider B — one charge, not two',
    active: ['wk', 'pad', 's3'],
    dot: [2, 'done'],
  },
  {
    log: 'shot 4 done — 4/5 rendered',
    active: ['wk', 's3'],
    dot: [3, 'done'],
  },
  {
    log: 'shot 5 done — 5/5 rendered',
    active: ['wk', 's3'],
    dot: [4, 'done'],
  },
  { log: 'ffmpeg compose → final cut', active: ['wk', 's3'] },
  { log: 'moderation post-check passed', active: ['mod', 'orch'] },
  {
    log: 'job complete → settle per task, refund unconsumed hold',
    active: ['orch', 'jobs', 'cred'],
    chip: '100 settled · 20 refunded',
  },
  { log: 'gallery rendered from CDN', active: ['rt', 'web'] },
];

const Simulation: React.FunctionComponent = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <section ref={sectionRef}>
        <Heading className='kicl-font-size-larger' is='h3'>
          Watch it run
        </Heading>
        <Text>
          A simulated Character Creator job through the architecture above -
          five shot tasks, one provider timeout, an idempotent retry, a
          circuit-break failover, and per-task settlement. The failure is the
          point: shot three re-renders, nothing else does, and nobody is charged
          twice.
        </Text>
        <SimulationPlayer
          chipLabel='credits'
          chipStart='no hold yet'
          dotLabels={['shot 1', 'shot 2', 'shot 3', 'shot 4', 'shot 5']}
          idleHint='Press run to submit a job.'
          runLabel='Run a job'
          sectionRef={sectionRef}
          spec={services}
          steps={STEPS}
        />
      </section>
    </Layout>
  );
};

export default Simulation;
