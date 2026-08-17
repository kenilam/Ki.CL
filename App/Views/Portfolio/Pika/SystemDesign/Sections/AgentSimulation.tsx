import React from 'react';

// Components
import { Heading, Layout, Text } from '@/Components';

// Diagrams
import agentPlane from '../Diagrams/agentPlane';

// Partials
import SimulationPlayer, { type PlayerStep } from './SimulationPlayer';

/**
 * One agent session through the Part 2 plane — the draft ladder, a
 * mid-session steer, and the governor's budget gate ahead of the hero
 * render. Tool calls execute as ordinary Part 1 jobs throughout.
 */
const STEPS: PlayerStep[] = [
  {
    log: 'user brief — "a 5-move fitness short with my character"',
    active: ['chat'],
    chip: '0 / 430 spent',
  },
  {
    log: 'turn 1 · context assembled — media summaries, never raw video',
    active: ['art', 'sess'],
  },
  {
    log: 'plan: three draft variations at draft tier',
    active: ['art', 'tools'],
  },
  {
    log: 'governor prices the turn from cost models — 36 credits, approved',
    active: ['gov'],
  },
  {
    log: 'draft tool calls become ordinary jobs',
    active: ['tools', 'jobs', 'orch'],
  },
  {
    log: 'drafts rendering — low resolution, short clips',
    active: ['orch', 'pad'],
    dot: [0, 'running'],
  },
  {
    log: 'draft 1 ready',
    active: ['pad', 's3'],
    dot: [0, 'done'],
    chip: '12 / 430 spent',
  },
  {
    log: 'draft 2 ready',
    active: ['pad', 's3'],
    dot: [1, 'done'],
    chip: '24 / 430 spent',
  },
  {
    log: 'draft 3 ready',
    active: ['pad', 's3'],
    dot: [2, 'done'],
    chip: '36 / 430 spent',
  },
  {
    log: 'user interrupts — "warmer lighting on the second one"',
    active: ['chat'],
  },
  {
    log: 'turn 2 · image.edit against draft 2 lineage — 6 credits, approved',
    active: ['art', 'sess', 'gov'],
  },
  {
    log: 'draft 2b ready — user approves the direction',
    active: ['jobs', 'pad', 's3', 'chat'],
    dot: [1, 'done'],
    chip: '42 / 430 spent',
  },
  {
    log: 'turn 3 · hero render requested — Seedance tier, 180 credits',
    active: ['art', 'tools'],
    dot: [3, 'queued'],
  },
  {
    log: 'governor blocks — hero tier needs explicit confirmation',
    failed: ['gov'],
    dot: [3, 'retry'],
  },
  {
    log: 'user confirms — "430 credits / Upgrade" moment from the mockups',
    active: ['chat', 'gov'],
  },
  {
    log: 'hero render — one job, on the approved direction only',
    active: ['jobs', 'orch', 'pad'],
    dot: [3, 'running'],
  },
  {
    log: 'hero ready — session closes at 222 of 430 credits',
    active: ['s3', 'cred'],
    dot: [3, 'done'],
    chip: '222 / 430 spent',
  },
  {
    log: 'trace logged — replayable for the eval harness',
    active: ['eval', 'obs'],
  },
];

const AgentSimulation: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <section>
        <Heading className='kicl-font-size-larger' is='h3'>
          Watch the agent work
        </Heading>
        <Text>
          One agent session through the plane above - three cheap drafts, a
          mid-session steer, and the governor holding the expensive render
          behind an explicit confirmation. The hero pass - the full-quality
          final render - runs once, on the approved direction, and the session
          ends with more than enough budget left over.
        </Text>
        <SimulationPlayer
          chipLabel='budget'
          chipStart='430 credits'
          dotLabels={['draft 1', 'draft 2', 'draft 3', 'hero']}
          idleHint='Press run to start a session.'
          runLabel='Run a session'
          spec={agentPlane}
          steps={STEPS}
        />
      </section>
    </Layout>
  );
};

export default AgentSimulation;
