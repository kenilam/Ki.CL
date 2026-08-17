import React, { useCallback, useEffect, useRef, useState } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Button, Card, CardContent, Layout, Spinner, Text } from '@/Components';

// Diagrams
import Diagram from '../Diagrams';
import type { Spec } from '../Diagrams/Spec';

// Constants
import { CLASS_NAME } from '../constants';

const STEP_MS = 900;

export type DotState = 'done' | 'idle' | 'queued' | 'retry' | 'running';

export type PlayerStep = {
  active?: string[];
  /** Replaces the free-form status chip (e.g. credits, budget). */
  chip?: string;
  dot?: [number, DotState];
  failed?: string[];
  log: string;
};

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
  const ref = {
    diagram: useRef<HTMLElement>(null),
    log: useRef<HTMLDivElement>(null),
  };

  const run = useCallback(() => {
    ref.diagram.current?.scrollIntoView({ block: 'center', behavior: 'auto' });
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

  useEffect(() => {
    ref.log.current?.scrollTo({ top: ref.log.current.scrollHeight });
  }, [step]);

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
    <>
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
        ref={ref.diagram}
        spec={spec}
        state={{ active: current?.active, failed: current?.failed }}
      />
      <Card className='kicl-inline-size-full' is='aside' size='sm'>
        <CardContent>
          <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
            <div>
              <div className={`${CLASS_NAME}__simulation-status`}>
                {dotLabels.map((label, index) => (
                  <span
                    className={`${CLASS_NAME}__simulation-chip`}
                    key={label}
                  >
                    <span
                      className={classNames(
                        `${CLASS_NAME}__simulation-dot`,
                        `${CLASS_NAME}__simulation-dot--${dots[index]}`
                      )}
                    />
                    {label}
                  </span>
                ))}
                <span className={`${CLASS_NAME}__simulation-chip`}>
                  {chipLabel} · {chip}
                </span>
              </div>
              <div
                className={`${CLASS_NAME}__simulation-log`}
                ref={ref.log}
                role='log'
              >
                {seen.length === 0 ? (
                  <Text dense variant='secondary'>
                    {idleHint}
                  </Text>
                ) : (
                  seen.map((s, index) => (
                    <div key={index}>
                      {String(index + 1).padStart(2, '0')} · {s.log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </Layout>
        </CardContent>
      </Card>
    </>
  );
};

export default SimulationPlayer;
