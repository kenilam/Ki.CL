import React, { useMemo } from 'react';

// Libraries
import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

// Components
import { Heading, Layout, Text } from 'design/components';

// Diagrams
import { services } from '@/views/portfolio/pika/system-design/diagrams/services';

// Partials
import { type PlayerStep, SimulationPlayer } from './simulation-player';

// Constants
import {
  SECTION_HEADING,
  SECTION_ID,
} from '@/views/portfolio/pika/system-design/constants';

const SHOTS = [1, 2, 3, 4, 5];
const total = SHOTS.length;

/**
 * One Character Creator job through the Part 1 architecture — including the
 * failure the design is built around: a provider timeout, an idempotent
 * retry, a circuit-break failover, and per-task settlement.
 */
const steps = (t: TFunction<'pika'>): PlayerStep[] => [
  {
    log: t('watch_it_run.log.posted'),
    active: ['web', 'gw'],
    chip: t('watch_it_run.chip_held'),
  },
  { log: t('watch_it_run.log.validated'), active: ['gw', 'jobs', 'mod'] },
  {
    log: t('watch_it_run.log.started', { total }),
    active: ['jobs', 'orch', 'pg'],
  },
  {
    log: t('watch_it_run.log.queued', { number: 1 }),
    active: ['orch', 'q'],
    dot: [0, 'queued'],
  },
  {
    log: t('watch_it_run.log.rendering', { number: 1 }),
    active: ['q', 'wk', 'pad'],
    dot: [0, 'running'],
  },
  {
    log: t('watch_it_run.log.stored', { number: 1 }),
    active: ['wk', 's3'],
    dot: [0, 'done'],
  },
  {
    log: t('watch_it_run.log.progress', { number: 1, total }),
    active: ['ev', 'rt', 'web'],
  },
  {
    log: t('watch_it_run.log.done', { number: 2, total }),
    active: ['wk', 's3', 'ev'],
    dot: [1, 'done'],
  },
  {
    log: t('watch_it_run.log.rendering', { number: 3 }),
    active: ['q', 'wk', 'pad'],
    dot: [2, 'running'],
  },
  { log: t('watch_it_run.log.timeout'), failed: ['pad'], dot: [2, 'retry'] },
  { log: t('watch_it_run.log.backoff'), active: ['wk'], dot: [2, 'retry'] },
  { log: t('watch_it_run.log.circuit'), failed: ['pad'], dot: [2, 'retry'] },
  {
    log: t('watch_it_run.log.failover', { number: 3 }),
    active: ['wk', 'pad', 's3'],
    dot: [2, 'done'],
  },
  {
    log: t('watch_it_run.log.done', { number: 4, total }),
    active: ['wk', 's3'],
    dot: [3, 'done'],
  },
  {
    log: t('watch_it_run.log.done', { number: 5, total }),
    active: ['wk', 's3'],
    dot: [4, 'done'],
  },
  { log: t('watch_it_run.log.composed'), active: ['wk', 's3'] },
  { log: t('watch_it_run.log.moderated'), active: ['mod', 'orch'] },
  {
    log: t('watch_it_run.log.settled'),
    active: ['orch', 'jobs', 'cred'],
    chip: t('watch_it_run.chip_settled'),
  },
  { log: t('watch_it_run.log.gallery'), active: ['rt', 'web'] },
];

const Simulation: React.FunctionComponent = () => {
  const { t } = useTranslation('pika');

  const spec = useMemo(() => services(t), [t]);
  const scenario = useMemo(() => steps(t), [t]);
  const dotLabels = useMemo(
    () => SHOTS.map((number) => t('watch_it_run.dot', { number })),
    [t]
  );

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <section aria-labelledby={SECTION_ID.watchItRun}>
        <Heading className={SECTION_HEADING} id={SECTION_ID.watchItRun} is='h2'>
          {t('title', { context: 'watch_it_run' })}
        </Heading>
        <Text>{t('watch_it_run.intro')}</Text>
        <SimulationPlayer
          chipStart={t('watch_it_run.chip_none')}
          dotLabels={dotLabels}
          idleHint={t('hint', { context: 'job' })}
          runLabel={t('action', { context: 'run_job' })}
          spec={spec}
          steps={scenario}
        />
      </section>
    </Layout>
  );
};

export { Simulation };
