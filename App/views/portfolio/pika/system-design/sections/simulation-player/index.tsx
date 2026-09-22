import React, { useCallback, useEffect, useRef, useState } from 'react';

// Components
import { Button, Card, CardContent, Layout, Spinner } from '@/components';

// Diagrams
import { Diagram } from '@/views/portfolio/pika/system-design/diagrams';
import type { Spec } from '@/views/portfolio/pika/system-design/diagrams/spec';

// Context
import { type DotState, type PlayerStep, SimulationContext } from './context';

// Partials
import { Log } from './log';
import { Status } from './status';

const STEP_MS = 900;

type Props = {
  chipLabel: string;
  chipStart: string;
  dotLabels: string[];
  idleHint: string;
  runLabel: string;
  spec: Spec;
  steps: PlayerStep[];
};

/**
 * Deterministic scenario player over a Diagram: steps advance on a timer,
 * lighting up nodes, ticking status dots, and narrating an event log.
 */
const SimulationPlayer: React.FunctionComponent<Props> = ({
  chipLabel,
  chipStart,
  dotLabels,
  idleHint,
  runLabel,
  spec,
  steps,
}) => {
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const diagram = useRef<HTMLElement>(null);

  const run = useCallback(() => {
    diagram.current?.scrollIntoView({ block: 'center', behavior: 'auto' });
    setStep(-1);
    setPlaying(true);
  }, []);

  useEffect(() => {
    if (!playing) {
      return;
    }

    const timer = window.setInterval(() => {
      setStep((current) => {
        if (current + 1 >= steps.length) {
          setPlaying(false);
          return current;
        }

        return current + 1;
      });
    }, STEP_MS);

    return () => window.clearInterval(timer);
  }, [playing, steps.length]);

  const seen = steps.slice(0, step + 1);
  const current = step >= 0 ? steps[step] : undefined;

  const dots: DotState[] = dotLabels.map(() => 'idle');
  let chip = chipStart;

  seen.forEach((s) => {
    if (s.dot) {
      dots[s.dot[0]] = s.dot[1];
    }

    if (s.chip) {
      chip = s.chip;
    }
  });

  const finished = !playing && step >= steps.length - 1;

  return (
    <SimulationContext.Provider
      value={{ chip, chipLabel, dotLabels, dots, idleHint, seen }}
    >
      <Layout
        alignContent='center'
        alignItems='center'
        autoFlow='column'
        gap='narrow'
        justifyContent='start'
        justifyItems='start'
      >
        <section>
          <Button disabled={playing} onClick={run} size='small' type='button'>
            {finished ? 'Replay' : playing ? 'Running' : runLabel}
          </Button>
          <Spinner in={playing} position='inline' size='small' />
        </section>
      </Layout>
      <Diagram
        ref={diagram}
        spec={spec}
        state={{ active: current?.active, failed: current?.failed }}
      />
      <Card className='kicl-inline-size-full' is='aside' size='sm'>
        <CardContent>
          <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
            <div>
              <Status />
              <Log />
            </div>
          </Layout>
        </CardContent>
      </Card>
    </SimulationContext.Provider>
  );
};

export type { DotState, PlayerStep };
export { SimulationPlayer };
