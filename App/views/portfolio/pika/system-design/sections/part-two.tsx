import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import {
  Button,
  Dialog,
  Heading,
  Layout,
  List,
  ListItem,
  Text,
} from '@/components';

// Diagrams
import { Diagram } from '../diagrams';
import { agentPlane } from '../diagrams/agent-plane';
import { sessionModel } from '../diagrams/session-model';

// Constants
import { CLASS_NAME } from '../constants';

const PartTwo: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='row' gap='wide' justifyItems='stretch'>
      <section>
        <Heading className='kicl-font-size-larger' is='h3'>
          Part 2 - The agent experience
        </Heading>
        <Text variant='secondary'>
          Part 2 of the brief adds a Claude Code-style agent for creative work:
          the user describes what they want in natural language, and the agent
          iteratively creates and edits media using the same primitives that
          power the Apps.
        </Text>

        <Heading className='kicl-font-size-large' is='h4'>
          What changes, what stays shared
        </Heading>

        <Layout alignItems='center' justifyContent='stretch'>
          <Button
            aria-label='Agent plane diagram. Open the full image.'
            className={classNames(
              'kicl-inline-size-full',
              `${CLASS_NAME}__preview`
            )}
            command='show-modal'
            commandFor='diagram-agent-plane'
            unstyled
          >
            <Diagram spec={agentPlane} />
          </Button>
        </Layout>
        <Dialog
          className={`${CLASS_NAME}__full`}
          fullScreen
          id='diagram-agent-plane'
        >
          <Layout alignItems='center' justifyContent='center'>
            <section>
              <Diagram spec={agentPlane} />
            </section>
          </Layout>
        </Dialog>
        <Text>
          The agent is another client of the platform. Every piece of Part
          1&apos;s execution plane - jobs, orchestration, adapters, assets,
          credits, moderation, task metrics - serves the agent without
          modification. The agent needs the same vocabulary the Apps already
          speak, which is what the manifests and primitives in Part 1 were for.
        </Text>

        <Heading className='kicl-font-size-large' is='h4'>
          Agent harness
        </Heading>
        <Text>
          The code lives in a new Agent Runtime service: stateless loop
          executors pulling from a session queue, with everything durable -
          message history, working plan, media context, budget spent - in the
          session store. A turn is itself a durable workflow, which means a
          crash mid-turn resumes mid-turn. It is the same <code>Temporal</code>{' '}
          machinery from Part 1.
        </Text>
        <Text>
          The agent plane adds three small tables that key into Part 1&apos;s
          rather than duplicating them - a tool call
          <em> is</em> an ordinary job, so it inherits cost tracking, retries,
          and lineage from the tables that already exist:
        </Text>
        <Layout alignItems='center' justifyContent='stretch'>
          <Button
            aria-label='Agent session data model diagram. Open the full image.'
            className={classNames(
              'kicl-inline-size-full',
              `${CLASS_NAME}__preview`
            )}
            command='show-modal'
            commandFor='diagram-session-model'
            unstyled
          >
            <Diagram spec={sessionModel} />
          </Button>
        </Layout>
        <Dialog
          className={`${CLASS_NAME}__full`}
          fullScreen
          id='diagram-session-model'
        >
          <Layout alignItems='center' justifyContent='center'>
            <section>
              <Diagram spec={sessionModel} />
            </section>
          </Layout>
        </Dialog>
        <Text>
          Through <code>TOOL_CALL.job_id</code>, the agent&apos;s work lands in
          the same job, task, and asset tables a button press writes to - which
          is what makes replay and the governor&apos;s ledger bookkeeping
          possible without new infrastructure.
        </Text>
        <List is='ol'>
          <ListItem>
            <Text dense>
              <Text is='span' className='kicl-font-weight-bold'>
                Context assembly.
              </Text>{' '}
              The system prompt sets a creative-director persona; session assets
              arrive as structured summaries with thumbnails, captioned frames
              and lineage - never raw video. When the agent needs to look at
              something, inspect extracts keyframes for a vision model.
            </Text>
          </ListItem>
          <ListItem>
            <Text dense>
              <Text is='span' className='kicl-font-weight-bold'>
                Tool selection.
              </Text>{' '}
              The tool registry mechanically projects the primitive schemas from
              Part 1 into tool definitions - one source of truth, so a new
              primitive is a new agent capability with zero agent-side code.
              Published Apps become macro-tools too: calling{' '}
              <code>character-creator</code> beats hand-orchestrating five
              primitives, because that path is already tested.
            </Text>
          </ListItem>
          <ListItem>
            <Text dense>
              <Text is='span' className='kicl-font-weight-bold'>
                Execution.
              </Text>{' '}
              Tool calls become ordinary jobs with the same validation, credits
              and moderation as a button press. Long renders suspend the turn
              durably instead of parking a worker.
            </Text>
          </ListItem>
          <ListItem>
            <Text dense>
              <Text is='span' className='kicl-font-weight-bold'>
                Observe and iterate.
              </Text>{' '}
              Results come back as asset refs plus a vision critique on request.
              Warm up the lighting on shot two becomes an{' '}
              <code>image.edit</code> cycle against lineage the agent can see,
              and approved-draft checkpoints keep iteration converging instead
              of wandering.
            </Text>
          </ListItem>
        </List>
        <Text>
          New messages preempt at the next tool boundary, queued-but-unstarted
          jobs cancel, and renders already running finish and join the revised
          context.
        </Text>

        <Heading className='kicl-font-size-large' is='h4'>
          Cost
        </Heading>
        <Text>
          An open-ended loop with video generation in its body can run up an
          enormous bill, so the design assumes the loop will misbehave and
          constrains it before it runs. By default the agent explores at draft
          tier - low resolution, short clips, cheaper models - converges with
          the user on drafts, and spends the expensive render once, on the
          approved direction. The hero pass is the full-resolution render on the
          top-tier model, the asset the user ships. It runs at the end of the
          session rather than inside the loop, and the governor enforces that: a
          draft-phase turn requesting a hero-tier render needs the user to
          confirm. The risk is fidelity. If drafts do not predict finals, users
          iterate at hero tier, which is the loop the ladder exists to prevent,
          so drafts use the same model at reduced resolution rather than a
          cheaper model. Hero re-render rate is the ladder&apos;s health metric.
        </Text>
        <Text>
          Budgets are hard limits. Each session carries a credit budget, and the
          governor prices every turn from the primitives&apos; declared cost
          models - the number comes from the platform, not the model it
          constrains - and blocks any call that would go past the remainder. A
          runaway detector halts the loop on repeated similar tool calls with no
          user message in between. LLM spend gets model routing, prompt caching
          and compaction, but LLM cost sits an order of magnitude below video
          cost. Most of the savings come from the draft ladder.
        </Text>

        <Heading className='kicl-font-size-large' is='h4'>
          Testing &amp; evaluation
        </Heading>
        <Text>
          A non-deterministic agent producing subjective output cannot be tested
          for exact answers, so the strategy is to evaluate distributions
          against rubrics instead. A golden suite of around a hundred briefs
          covers App-adjacent tasks, open-ended creation, iteration sequences -
          make it warmer, then check whether it edited the right asset - and
          adversarial cases like impossible asks and budget pressure.
        </Text>
        <Text>
          Scoring has two layers. Process checks are fully deterministic - did
          the agent keep drafts before finals, stay inside budget, preserve
          character lineage, finish in a sane number of turns - and run on
          stubbed providers with zero GPU spend, which in practice catches most
          regressions. Output quality is scored by an LLM-and-vision judge
          working through a decomposed rubric, calibrated quarterly against
          human panels. Judge scores gate on deltas rather than absolute scores,
          because the judge is consistent, but its absolute scores are not
          reliable.
        </Text>
        <Text>
          Every production session already logs its full trace, so a prompt or
          model change replays history: process metrics diff deterministically,
          divergence gets judge-scored, and changes ship through a 5% canary
          watched on process metrics, thumbs-down rate and cost per session.
          Live user signals - regeneration rate, abandonment, explicit feedback
          - are the online eval.
        </Text>
      </section>
    </Layout>
  );
};

export { PartTwo };
