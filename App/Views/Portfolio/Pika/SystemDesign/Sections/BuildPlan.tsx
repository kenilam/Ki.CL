import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, Layout, Text } from '@/Components';

// Constants
import { CLASS_NAME } from '../constants';

const TH_CLASS_NAME = classNames(
  'kicl-font-size-small',
  'kicl-letter-spacing',
  'kicl-text-align-start',
  'kicl-text-transform-uppercase'
);

const PHASES = [
  {
    phase: 1,
    scope:
      'Skeleton — manifest schema and registry, Job Service, the generic workflow interpreter, two primitives, one real App end-to-end.',
    time: '2 weeks',
  },
  {
    phase: 2,
    scope:
      'Hardening — provider adapters with webhooks and idempotency, credits hold and settle, SSE progress, task metrics dashboard.',
    time: '2 weeks',
  },
  {
    phase: 3,
    scope:
      'Video primitives and the ffmpeg pool, three flagship Apps, App Studio v0 with sandboxed runs and versioned publish.',
    time: '2–3 weeks',
  },
  {
    phase: 4,
    scope:
      'Agent MVP — runtime loop on Temporal, tool registry projection, session store, draft-final policy, budgets and model routing.',
    time: '2–3 weeks',
  },
  {
    phase: 5,
    scope:
      'Eval harness — golden briefs, process checks, judge rubric, replay — plus canary machinery.',
    time: '1–2 weeks',
  },
];

const PROMPTS: Array<{ body: React.ReactNode; title: string }> = [
  {
    title: 'Domain skeleton',
    body: (
      <>
        Implement the App manifest system for a creative platform. Deliverables:
        (a) JSON Schema for the manifest format in{' '}
        <code>schema/app-manifest.json</code> — typed inputs (text, image, enum,
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
        <code>(job_id, node_id)</code> — stable across retry attempts, so a
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
        lost, provider 429 storm — assert exactly-once task completion and
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

const BuildPlan: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='row' gap='wide' justifyItems='stretch'>
      <section>
        <Heading className='kicl-font-size-larger' is='h3'>
          Estimate &amp; build plan
        </Heading>
        <Text>
          These numbers assume me leading with coding agents doing the heavy
          lifting, Temporal Cloud so orchestration is bought rather than built,
          and one product engineer joining from week three. Calendar time, not
          ideal-hours:
        </Text>
        <table className={`${CLASS_NAME}__phases`}>
          <thead>
            <tr>
              <th
                className={classNames(
                  'kicl-padding-inline-narrow',
                  TH_CLASS_NAME
                )}
                scope='col'
              >
                Phase
              </th>
              <th
                className={classNames(
                  'kicl-padding-inline-narrow',
                  TH_CLASS_NAME
                )}
                scope='col'
              >
                Scope
              </th>
              <th
                className={classNames(
                  'kicl-padding-inline-narrow',
                  TH_CLASS_NAME
                )}
                scope='col'
              >
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {PHASES.map(({ phase, scope, time }) => (
              <tr key={phase}>
                <td>{phase}</td>
                <td>{scope}</td>
                <td className='kicl-text-nowrap'>{time}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Text>
          Roughly 9–12 weeks to a credible v1, with Part 1 alone at six to seven
          — and that number only holds because v1 is deliberately narrow: one
          region, two providers, an internal-only Studio, and generation kept
          behind vendor APIs. Worth saying plainly: the long pole is not the
          happy path, it is provider-adapter edge cases. Coding agents compress
          the skeleton and the agent loop dramatically, but they help much less
          with debugging a flaky third-party webhook — which is why the middle
          phases carry most of the schedule risk.
        </Text>

        <Heading className={classNames('kicl-font-size-large')} is='h4'>
          Prompts I&apos;d use to steer a coding agent
        </Heading>
        <Text>
          I&apos;d feed these to Claude Code in stages, each one ending at
          something verifiable. Every prompt carries its own acceptance tests —
          agent-written code is only as trustworthy as the harness checking it.
        </Text>
        {PROMPTS.map(({ body, title }, index) => (
          <React.Fragment key={title}>
            <Text dense>
              <strong>
                {index + 1} — {title}.
              </strong>
            </Text>
            <Text
              className={classNames(
                'kicl-position-relative',
                `${CLASS_NAME}__prompt`
              )}
              is='blockquote'
            >
              {body}
            </Text>
          </React.Fragment>
        ))}
      </section>
    </Layout>
  );
};

export default BuildPlan;
