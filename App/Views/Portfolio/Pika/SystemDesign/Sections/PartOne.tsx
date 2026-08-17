import React from 'react';

// Libraries
import classNames from 'classnames';
import Prism from 'prismjs';
import 'prismjs/components/prism-yaml';

// Components
import {
  Button,
  Card,
  CardContent,
  Dialog,
  Heading,
  Layout,
  List,
  ListItem,
  Text,
} from '@/Components';

// Diagrams
import Diagram from '../Diagrams';
import dataModel from '../Diagrams/dataModel';
import requestFlow from '../Diagrams/requestFlow';
import services from '../Diagrams/services';

// Constants
import { CLASS_NAME } from '../constants';

const MANIFEST = `# app: character-creator @ v4
id: character-creator
version: 4
metadata:
  title: Character Creator
  credits: { estimate: dynamic }
inputs:
  - key: name         { type: text, required: true }
  - key: photo        { type: image, required: true }
  - key: voice        { type: enum, source: voice-library }
  - key: image_model  { type: model-select, default: nano-banana-edit }
workflow: # DAG of primitive calls
  - id: validate_face
    primitive: vision.face_check
    args: { image: $inputs.photo }
  - id: build_prompt
    primitive: llm.template
    needs: [validate_face]
  - id: gen_character
    primitive: image.generate
    needs: [build_prompt]
    retry: { max: 3, backoff: exponential }
outputs:
  - source: $gen_character.assets
    layout: gallery
    actions: [regenerate, handoff: [i2v, short-film, ads]]`;

const PartOne: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='row' gap='wide' justifyItems='stretch'>
      <section>
        <Heading className='kicl-font-size-larger' is='h3'>
          Part 1 - The App platform
        </Heading>

        <Heading className='kicl-font-size-large' is='h4'>
          What is an App?
        </Heading>
        <Text>
          An App is a declarative manifest, stored and versioned like a
          document:
        </Text>
        <Card is='aside'>
          <CardContent>
            <Text
              className={classNames('kicl-font-family-mono')}
              is='blockquote'
              unstyled
            >
              <pre>
                <code
                  dangerouslySetInnerHTML={{
                    __html: Prism.highlight(
                      MANIFEST,
                      Prism.languages.yaml,
                      'yaml'
                    ),
                  }}
                />
              </pre>
            </Text>
          </CardContent>
        </Card>
        <Text>
          The typed input schema means the client renders any App&apos;s form
          straight from the manifest - there is no per-App frontend code to
          write or maintain. The DAG structure lets the orchestrator checkpoint,
          retry, and parallelize steps without understanding what any particular
          App is for. And immutable versions make rollback a pointer move:
          publishing writes a new row, and running jobs stay pinned to whatever
          version they started on.
        </Text>
        <Text>
          Primitives are the platform&apos;s vocabulary: thin, typed wrappers
          around the backend creative APIs (<code>video.generate</code>,{' '}
          <code>image.edit</code>,<code>vision.analyze</code>,{' '}
          <code>media.ffmpeg</code>, <code>llm.complete</code>, and so on). Each
          one declares its argument schema, cost model, latency class, timeout
          profile, and which providers can serve it. When a new vendor model
          appears, we register a provider, and every App with a{' '}
          <code>model-select</code>
          input picks it up without touching a single manifest - though new
          providers earn default traffic through the same staged rollout as
          Apps, watched against the primitive&apos;s error budget.
        </Text>

        <Heading className='kicl-font-size-large' is='h4'>
          Core data model
        </Heading>
        <Layout alignItems='center' justifyContent='stretch'>
          <Button
            aria-label='Core data model diagram. Open the full image.'
            className={classNames(
              'kicl-inline-size-full',
              `${CLASS_NAME}__preview`
            )}
            command='show-modal'
            commandFor='diagram-data-model'
            unstyled
          >
            <Diagram spec={dataModel} />
          </Button>
        </Layout>
        <Dialog
          className={`${CLASS_NAME}__full`}
          fullScreen
          id='diagram-data-model'
        >
          <Layout alignItems='center' justifyContent='center'>
            <section>
              <Diagram spec={dataModel} />
            </section>
          </Layout>
        </Dialog>
        <Text>
          Task output refs point into content-addressed asset storage rather
          than carrying blobs inline. The lineage field on assets records which
          job, task, and seed produced each artifact. That is what makes
          regenerate work and how provenance gets displayed - and in Part 2, the
          same lineage records serve as the agent&apos;s memory of what exists
          in a session.
        </Text>

        <Heading className='kicl-font-size-large' is='h4'>
          Services &amp; components
        </Heading>
        <Layout alignItems='center' justifyContent='stretch'>
          <Button
            aria-label='Services and components diagram. Open the full image.'
            className={classNames(
              'kicl-inline-size-full',
              `${CLASS_NAME}__preview`
            )}
            command='show-modal'
            commandFor='diagram-services'
            unstyled
          >
            <Diagram spec={services} />
          </Button>
        </Layout>
        <Dialog
          className={`${CLASS_NAME}__full`}
          fullScreen
          id='diagram-services'
        >
          <Layout alignItems='center' justifyContent='center'>
            <section>
              <Diagram spec={services} />
            </section>
          </Layout>
        </Dialog>
        <Text>
          The App Registry owns manifests: CRUD, versioning, validation, publish
          and rollback. The Job Service is the front door for execution - it
          validates inputs against the pinned manifest, places a hold on credits
          (a hold, not a charge), writes the job row, and hands off to the
          orchestrator.
        </Text>
        <Text>
          The Orchestrator is the heart of the system. It expands the
          manifest&apos;s DAG into task rows, schedules whatever is ready onto
          per-primitive-class queues, records every state transition, and drives
          retries and timeouts from durable state. I would build this on
          <code>Temporal</code> rather than hand-rolling it. Checkpointed
          workflow state, timers, retries - that is precisely the problem{' '}
          <code>Temporal</code> exists to solve, and hand-rolled DAG engines
          accumulate exactly the reliability bugs it prevents. The manifest
          interpreter is a single generic workflow, which means launching a new
          App deploys no orchestration code at all.
        </Text>
        <Text>
          Stateless workers pull typed tasks and reach providers through an
          adapter layer that smooths over the annoying differences: auth,
          request shape, webhook versus polling completion, error taxonomy,
          per-provider rate limits. Every task transition emits an event, and a
          realtime gateway fans job progress out to clients over{' '}
          <code>SSE</code> - this is what lets the UI say three of five shots
          rendered instead of showing a spinner for four minutes.
        </Text>
        <Text>
          Credits are held when a job starts and settled per task as work
          completes - never per attempt, so failed retries are the
          platform&apos;s cost, not the user&apos;s - and when a job fails
          partway, the unconsumed hold flows back without special-case refund
          logic. Moderation runs before generation and after. Observability is
          task-labeled from day one - success rate, p95 latency, retry count,
          and cost, each sliced by app, primitive, and provider.
        </Text>
        <Text>
          <code>Postgres</code> as a single box invites an obvious question, so
          some rough numbers. At 100k jobs a day averaging six tasks each, task
          and attempt rows land under a million a day - partitionable by month
          and years from being the bottleneck. Assets dominate instead: video at
          that volume is terabytes a day, which is exactly why bytes live in
          content-addressed <code>S3</code> behind a CDN and never near the
          database. The real ceiling is provider rate limits, which is what the
          per-provider admission control is for.
        </Text>
        <Layout alignItems='center' justifyContent='stretch'>
          <Button
            aria-label='Request flow diagram. Open the full image.'
            className={classNames(
              'kicl-inline-size-full',
              `${CLASS_NAME}__preview`
            )}
            command='show-modal'
            commandFor='diagram-request-flow'
            unstyled
          >
            <Diagram spec={requestFlow} />
          </Button>
        </Layout>
        <Dialog
          className={`${CLASS_NAME}__full`}
          fullScreen
          id='diagram-request-flow'
        >
          <Layout alignItems='center' justifyContent='center'>
            <section>
              <Diagram spec={requestFlow} />
            </section>
          </Layout>
        </Dialog>

        <Heading className='kicl-font-size-large' is='h4'>
          Key trade-offs
        </Heading>
        <Text>
          <Text is='span' className='kicl-font-weight-bold'>
            Async everywhere versus a sync fast-path.
          </Text>{' '}
          I went back and forth on giving cheap image calls a synchronous
          endpoint and decided against it. Even fast models have p99s ugly
          enough to stall HTTP connections, and a second execution path is a
          second set of failure modes to reason about forever. So everything
          returns a job id and streams events, and the line between queued and
          inline work is mechanical: primitives declare a latency class, and
          only provider-class calls become checkpointed task rows. The UX
          concession is perceived sync - the client keeps the composer open and
          renders progress as it arrives.
        </Text>
        <Text>
          <Text is='span' className='kicl-font-weight-bold'>
            Declarative manifests versus Apps-as-code.
          </Text>{' '}
          The code-first version of this platform - every App its own service -
          gives authors maximum power and the platform team maximum pain: N
          deploy pipelines, N failure modes, no shared retry story, and an
          engineer in the loop for every new App. Manifests invert all of that.
          What you give up is expressiveness, so the plan is to hold the line on
          declarative and keep one pressure valve: a <code>custom.step</code>{' '}
          primitive that calls out to a team-owned sandboxed function. The 5%
          edge case gets its escape hatch without contorting the format for
          everyone else.
        </Text>
        <Text>
          <Text is='span' className='kicl-font-weight-bold'>
            <code>Temporal</code> versus hand-rolling.
          </Text>{' '}
          Hand-rolling a queue-plus-state-machine on Redis and{' '}
          <code>Postgres</code> is a fun six weeks followed by a career of edge
          cases - workers dying mid-callback, retry storms, clock skew on
          timeouts. <code>Temporal</code> buys durable timers, exactly-once
          state transitions, and workflow visibility off the shelf. For a
          company whose product is long-running jobs, that trade is clearly
          right, and lock-in stays manageable because workers only ever speak
          the task schema.
        </Text>
        <Text>
          <Text is='span' className='kicl-font-weight-bold'>
            Webhooks versus polling.
          </Text>{' '}
          Adapters prefer webhooks but keep a polling reconciler behind them,
          because webhooks get lost in the real world. Every provider call
          carries an idempotency key scoped to the logical task - stable across
          retry attempts - so a redelivered webhook or a re-scheduled attempt
          maps back to the same generation. And billing has its own guarantee:
          the ledger settles each task at most once, so a duplicate generation
          can never become a duplicate charge.
        </Text>

        <Heading className='kicl-font-size-large' is='h4'>
          Resiliency
        </Heading>
        <Text>
          With video generation, failure is the steady state, not the exception.
          Providers time out, hand back corrupt files, and rate-limit without
          warning. So the design treats the individual task attempt, not the
          job, as the unit of failure.
        </Text>
        <List is='ul'>
          <ListItem>
            <Text dense>
              <Text is='span' className='kicl-font-weight-bold'>
                Retries with a taxonomy.
              </Text>{' '}
              Adapters classify every error: <code>retryable</code> gets
              exponential backoff with jitter, permanent fails fast and tells
              the user why, and a provider browning out trips a circuit breaker
              - failing work over to an equivalent provider where the manifest
              allows it.
            </Text>
          </ListItem>
          <ListItem>
            <Text dense>
              <Text is='span' className='kicl-font-weight-bold'>
                Checkpoint at every node.
              </Text>{' '}
              Task outputs persist before the next node schedules, so a crash
              resumes from the last completed step: a five-shot film that dies
              on shot five re-renders exactly one shot.
            </Text>
          </ListItem>
          <ListItem>
            <Text dense>
              <Text is='span' className='kicl-font-weight-bold'>
                Watchdogs and dead letters.
              </Text>{' '}
              Tasks that stop heartbeating are reaped and rescheduled; tasks
              that exhaust retries land in a dead-letter queue with full
              context, and jobs fail partially where the manifest allows - four
              of five shots plus a repair action, not an all-or-nothing error
              screen.
            </Text>
          </ListItem>
          <ListItem>
            <Text dense>
              <Text is='span' className='kicl-font-weight-bold'>
                Task-level monitoring.
              </Text>{' '}
              Every attempt is a row carrying app, primitive, provider, latency,
              cost and error class, so dashboards answer operational questions
              directly, and cost-anomaly alerts catch runaway loops before they
              bill anyone.
            </Text>
          </ListItem>
          <ListItem>
            <Text dense>
              <Text is='span' className='kicl-font-weight-bold'>
                Backpressure.
              </Text>{' '}
              Concurrency caps per user and per App, admission control keyed to
              queue depth, and the credit hold at job start - a viral App
              degrades to a queue position instead of toppling a provider.
            </Text>
          </ListItem>
        </List>

        <Heading className='kicl-font-size-large' is='h4'>
          Growth ships an App without engineering
        </Heading>
        <Text>
          The manifest architecture already is the no-code story - what Growth
          actually needs is tooling and guardrails wrapped around it. App Studio
          is an internal builder that edits manifests through forms: pick inputs
          from the typed field library, compose steps from the primitive
          catalog, preview the rendered App live, and test-run it in a sandbox
          against capped credits. Under the hood it is just writing YAML, and a
          template gallery covers the most common case of all - most new Apps
          are 90% an existing one.
        </Text>
        <Text>
          Governance keeps self-serve safe: validation and a deliberately
          lightweight approval on publish, staged rollout with an automatic halt
          on error-rate or cost regression, one-click rollback via the version
          pointer, and per-App budgets to cap blast radius. Because Apps are
          rows rather than deployments, the marginal cost of App #200 is a
          review, not a sprint.
        </Text>
      </section>
    </Layout>
  );
};

export default PartOne;
