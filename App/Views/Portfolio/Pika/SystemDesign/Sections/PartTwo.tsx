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
} from '@/Components';

// Diagrams
import Diagram from '../Diagrams';
import agentPlane from '../Diagrams/agentPlane';

// Constants
import { CLASS_NAME } from '../constants';

const PartTwo: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='row' gap='wide' justifyItems='stretch'>
      <section>
        <Heading className='kicl-font-size-larger' is='h3'>
          Part 2 — The agent experience
        </Heading>
        <Text variant='secondary'>
          The ask: a Claude Code-style agent for creative work — the user
          describes intent in natural language and the agent iteratively creates
          and edits media using the same primitives that power Apps.
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
          The framing I kept coming back to: the agent is a new client of the
          platform, not a new platform. Every piece of Part 1&apos;s execution
          plane — jobs, orchestration, adapters, assets, credits, moderation,
          task metrics — serves the agent without modification. This is where
          the manifest-and-primitive bet from Part 1 pays out, because the
          vocabulary the Apps have been speaking all along is exactly the
          vocabulary the agent needs.
        </Text>

        <Heading className='kicl-font-size-large' is='h4'>
          Agent harness
        </Heading>
        <Text>
          The code lives in a new Agent Runtime service: stateless loop
          executors pulling from a session queue, with everything durable —
          message history, working plan, media context, budget spent — in the
          session store. A turn is itself a durable workflow, which means a
          crash mid-turn resumes mid-turn. It is the same Temporal machinery
          from Part 1, running a different program.
        </Text>
        <List is='ol'>
          <ListItem>
            <Text dense>
              <Text is='span' className='kicl-font-weight-bold'>
                Context assembly.
              </Text>{' '}
              The system prompt sets a creative-director persona; session assets
              arrive as structured summaries with thumbnails, captioned frames
              and lineage — never raw video. When the agent needs to look at
              something, inspect extracts keyframes for a vision model. Seeing
              is just another tool.
            </Text>
          </ListItem>
          <ListItem>
            <Text dense>
              <Text is='span' className='kicl-font-weight-bold'>
                Tool selection.
              </Text>{' '}
              The tool registry mechanically projects the primitive schemas from
              Part 1 into tool definitions — one source of truth, so a new
              primitive is a new agent capability with zero agent-side code.
              Published Apps become macro-tools too: calling character-creator
              beats hand-orchestrating five primitives, because that path is
              battle-tested.
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
              Warm up the lighting on shot two becomes an image.edit cycle
              against lineage the agent can see, and approved-draft checkpoints
              keep iteration converging instead of wandering.
            </Text>
          </ListItem>
        </List>
        <Text>
          Interruption is first-class. New messages preempt at the next tool
          boundary; queued-but-unstarted jobs cancel; renders already running
          finish and simply join the revised context.
        </Text>

        <Heading className='kicl-font-size-large' is='h4'>
          Cost
        </Heading>
        <Text>
          An open-ended loop with video generation in the body is how you get a
          nightmare bill, so the design assumes the loop will misbehave and puts
          rails around it in advance. By default the agent explores at draft
          tier — low resolution, short clips, cheaper models — converges with
          the user on drafts, and spends the expensive render exactly once, on
          the approved direction. The hero-quality pass is the last step of the
          session, never the body of the loop, and the governor enforces it: a
          draft-phase turn requesting a hero-tier render needs the user to
          confirm. The real risk here is fidelity — if drafts don&apos;t predict
          finals, users iterate at hero tier, the exact loop the ladder exists
          to prevent — so drafts prefer the same model at reduced resolution
          over a cheaper model, and hero re-render rate is the ladder&apos;s
          health metric.
        </Text>
        <Text>
          Budgets are hard rails, not suggestions. Each session carries a credit
          budget, and the governor prices every turn from the primitives&apos;
          declared cost models — the estimate comes from the platform, not the
          LLM, so the rail isn&apos;t guarding itself — and blocks any call that
          would blow past the remainder. A runaway detector halts the loop on
          repeated similar tool calls with no user message in between. LLM spend
          gets model routing, prompt caching and compaction — but it is worth
          being plain about proportions: LLM cost sits an order of magnitude
          below video cost. The draft ladder is the lever that actually matters;
          the rest is tuning.
        </Text>

        <Heading className='kicl-font-size-large' is='h4'>
          Testing &amp; evaluation
        </Heading>
        <Text>
          A non-deterministic agent producing subjective output cannot be tested
          for exact answers, so the strategy is to evaluate distributions
          against rubrics instead. A golden suite of around a hundred briefs
          covers App-adjacent tasks, open-ended creation, iteration sequences —
          make it warmer, then check whether it edited the right asset — and
          adversarial cases like impossible asks and budget pressure.
        </Text>
        <Text>
          Scoring has two layers. Process checks are fully deterministic — did
          the agent keep drafts before finals, stay inside budget, preserve
          character lineage, finish in a sane number of turns — and run on
          stubbed providers with zero GPU spend, which in practice catches most
          regressions. Output quality is scored by an LLM-and-vision judge
          working through a decomposed rubric, calibrated quarterly against
          human panels. Judge scores gate on deltas, never on absolute taste,
          because the judge does not have taste. It has consistency.
        </Text>
        <Text>
          Every production session already logs its full trace, so a prompt or
          model change replays history: process metrics diff deterministically,
          divergence gets judge-scored, and changes ship through a 5% canary
          watched on process metrics, thumbs-down rate and cost per session.
          Live user signals — regeneration rate, abandonment, explicit feedback
          — are the online eval that closes the loop.
        </Text>
      </section>
    </Layout>
  );
};

export default PartTwo;
