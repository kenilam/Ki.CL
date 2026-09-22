import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, List, ListItem, Text } from '@/components';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as SYSTEM_DESIGN } from '@/views/portfolio/pika/system-design/constants';

const CLASS_NAME = `${SYSTEM_DESIGN}__prompt`;

const PROMPTS: Array<{ body: React.ReactNode; title: string }> = [
  {
    title: 'Domain skeleton',
    body: (
      <>
        Implement the App manifest system for a creative platform. Deliverables:
        (a) JSON Schema for the manifest format in{' '}
        <code>schema/app-manifest.json</code> - typed inputs (text, image, enum,
        model-select), workflow as a DAG of primitive calls with{' '}
        <code>needs</code> edges and per-node retry config, outputs; (b) a
        validator that rejects cycles, unknown primitives, and arg-type
        mismatches, with error messages naming the offending node; (c) Postgres
        migrations for <code>apps</code>, <code>app_versions</code> (immutable
        manifests, jsonb), <code>jobs</code>, <code>tasks</code>,{' '}
        <code>task_attempts</code>, <code>assets</code> per the ERD in DESIGN.md
        §1.2. Write property-based tests for the DAG validator (random DAGs with
        injected cycles must all be caught). Do not build any execution logic
        yet.
      </>
    ),
  },
  {
    title: 'Orchestration',
    body: (
      <>
        Build <code>RunAppWorkflow</code> as a single generic Temporal workflow
        that interprets a validated manifest: topologically schedule nodes, run
        each as an activity with the manifest&apos;s retry policy, persist task
        state transitions and output refs to Postgres, emit progress events to
        the bus. Every provider call takes an idempotency key derived from{' '}
        <code>(job_id, node_id)</code> - stable across retry attempts, so a
        re-run cannot double-submit the same generation. Prove resumability:
        kill the worker mid-DAG in a test and assert the job completes without
        re-running finished nodes and without duplicate provider calls (use the
        fake provider&apos;s call log).
      </>
    ),
  },
  {
    title: 'Provider adapters',
    body: (
      <>
        Create the provider adapter interface:{' '}
        <code>submit(request) → provider_ref</code>, webhook + polling
        completion, and error mapping into{' '}
        <code>{'{retryable, permanent, content_policy, degraded}'}</code>.
        Implement two adapters against the sandbox APIs in{' '}
        <code>providers/</code> plus a deterministic fake for tests. Add a
        reconciler that polls for jobs whose webhooks never arrived (&gt;2×
        expected latency). Integration test: webhook delivered twice, webhook
        lost, provider 429 storm - assert exactly-once task completion and
        correct backoff.
      </>
    ),
  },
  {
    title: 'Agent runtime',
    body: (
      <>
        Add the agent service per DESIGN.md Part 2: a Temporal-backed turn loop
        with session state in Postgres, tool registry generated from primitive
        schemas plus published Apps, and the cost governor (per-session budget,
        per-turn estimate gate, draft-tier default with confirmation required
        for hero-tier renders, runaway-loop halt on 3 repeated similar tool
        calls). Model routing: intent and arg-filling on the small model,
        planning on the large one. Ship with a scripted fake LLM so the loop is
        testable without model calls.
      </>
    ),
  },
  {
    title: 'Eval harness',
    body: (
      <>
        Build the eval runner: load briefs from <code>evals/briefs/*.yaml</code>
        , execute each against the agent with stubbed providers and pinned
        seeds, score process metrics (tool plausibility, draft-before-final
        ordering, budget adherence, turn count) deterministically, and emit a
        diffable JSON report. Add <code>--judge</code> mode that sends outputs
        to a vision-capable model with the rubric in{' '}
        <code>evals/rubric.md</code>. CI gate: process metrics may not regress
        on the golden set; judge deltas &gt; 0.3 flag for human review.
      </>
    ),
  },
];

const Prompts: React.FunctionComponent = () => (
  <>
    <Heading className={classNames('kicl-font-size-large')} is='h3'>
      Prompts I&apos;d use to steer a coding agent
    </Heading>
    <Text>
      I&apos;d feed these to Claude Code in stages, each one ending at something
      verifiable. Every prompt carries its own acceptance tests, because
      agent-written code is only as good as the tests checking it.
    </Text>
    <List gap='wide' is='ol'>
      {PROMPTS.map(({ body, title }, index) => (
        <ListItem autoFlow='row' gap='wide' key={title}>
          <Text is='strong' className='kicl-font-weight-bold'>
            {/* The list already numbers the items for assistive tech. */}
            <span aria-hidden>{index + 1}. </span>
            {title}.
          </Text>
          <Text
            className={classNames(
              CLASS_NAME,
              'kicl-padding-block-narrow',
              'kicl-padding-inline',
              'kicl-position-relative'
            )}
          >
            {body}
          </Text>
        </ListItem>
      ))}
    </List>
  </>
);

export { CLASS_NAME, Prompts };
