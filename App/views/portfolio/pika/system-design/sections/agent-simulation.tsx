import React, { useMemo } from 'react';

// Libraries
import classNames from 'classnames';
import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

// Components
import { Heading, Layout, Text } from 'design/components';

// Diagrams
import { agentPlane } from '@/views/portfolio/pika/system-design/diagrams/agent-plane';

// Partials
import { type PlayerStep, SimulationPlayer } from './simulation-player';

// Constants
import { SECTION_ID } from '@/views/portfolio/pika/system-design/constants';

/** Credits the session may spend, and what it has spent when it closes. */
const budget = 430;
const spent = 222;

const DRAFTS = [1, 2, 3];

/**
 * One agent session through the Part 2 plane — the draft ladder, a
 * mid-session steer, and the governor's budget gate ahead of the hero
 * render. Tool calls execute as ordinary Part 1 jobs throughout.
 */
const steps = (t: TFunction<'pika'>): PlayerStep[] => [
  {
    log: t('watch_the_agent_work.log.brief'),
    active: ['chat'],
    chip: t('watch_the_agent_work.chip_spent', { budget, spent: 0 }),
  },
  { log: t('watch_the_agent_work.log.context'), active: ['art', 'sess'] },
  { log: t('watch_the_agent_work.log.plan'), active: ['art', 'tools'] },
  { log: t('watch_the_agent_work.log.priced'), active: ['gov'] },
  {
    log: t('watch_the_agent_work.log.jobs'),
    active: ['tools', 'jobs', 'orch'],
  },
  {
    log: t('watch_the_agent_work.log.rendering'),
    active: ['orch', 'pad'],
    dot: [0, 'running'],
  },
  {
    log: t('watch_the_agent_work.log.draft_ready', { number: 1 }),
    active: ['pad', 's3'],
    dot: [0, 'done'],
    chip: t('watch_the_agent_work.chip_spent', { budget, spent: 12 }),
  },
  {
    log: t('watch_the_agent_work.log.draft_ready', { number: 2 }),
    active: ['pad', 's3'],
    dot: [1, 'done'],
    chip: t('watch_the_agent_work.chip_spent', { budget, spent: 24 }),
  },
  {
    log: t('watch_the_agent_work.log.draft_ready', { number: 3 }),
    active: ['pad', 's3'],
    dot: [2, 'done'],
    chip: t('watch_the_agent_work.chip_spent', { budget, spent: 36 }),
  },
  { log: t('watch_the_agent_work.log.interrupt'), active: ['chat'] },
  { log: t('watch_the_agent_work.log.edit'), active: ['art', 'sess', 'gov'] },
  {
    log: t('watch_the_agent_work.log.approved'),
    active: ['jobs', 'pad', 's3', 'chat'],
    dot: [1, 'done'],
    chip: t('watch_the_agent_work.chip_spent', { budget, spent: 42 }),
  },
  {
    log: t('watch_the_agent_work.log.hero_requested'),
    active: ['art', 'tools'],
    dot: [3, 'queued'],
  },
  {
    log: t('watch_the_agent_work.log.blocked'),
    failed: ['gov'],
    dot: [3, 'retry'],
  },
  {
    log: t('watch_the_agent_work.log.confirmed', { budget }),
    active: ['chat', 'gov'],
  },
  {
    log: t('watch_the_agent_work.log.hero_rendering'),
    active: ['jobs', 'orch', 'pad'],
    dot: [3, 'running'],
  },
  {
    log: t('watch_the_agent_work.log.hero_ready', { budget, spent }),
    active: ['s3', 'cred'],
    dot: [3, 'done'],
    chip: t('watch_the_agent_work.chip_spent', { budget, spent }),
  },
  { log: t('watch_the_agent_work.log.trace'), active: ['eval', 'obs'] },
];

const AgentSimulation: React.FunctionComponent = () => {
  const { t } = useTranslation('pika');

  const spec = useMemo(() => agentPlane(t), [t]);
  const scenario = useMemo(() => steps(t), [t]);
  const dotLabels = useMemo(
    () => [
      ...DRAFTS.map((number) =>
        t('watch_the_agent_work.dot_draft', { number })
      ),
      t('watch_the_agent_work.dot_hero'),
    ],
    [t]
  );

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <section aria-labelledby={SECTION_ID.watchTheAgentWork}>
        <Heading
          className={classNames(
            'kicl-font-size-larger',
            'kicl-padding-block-start-narrow',
            'kicl-position-relative'
          )}
          id={SECTION_ID.watchTheAgentWork}
          is='h2'
        >
          {t('title', { context: 'watch_the_agent_work' })}
        </Heading>
        <Text>{t('watch_the_agent_work.intro', { budget, spent })}</Text>
        <SimulationPlayer
          chipStart={t('watch_the_agent_work.chip_budget', { budget })}
          dotLabels={dotLabels}
          idleHint={t('hint', { context: 'session' })}
          runLabel={t('action', { context: 'run_session' })}
          spec={spec}
          steps={scenario}
        />
      </section>
    </Layout>
  );
};

export { AgentSimulation };
