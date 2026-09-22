import React from 'react';

// Libraries
import classNames from 'classnames';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as SYSTEM_DESIGN } from '@/views/portfolio/pika/system-design/constants';

const CLASS_NAME = `${SYSTEM_DESIGN}__phases`;

/** Header and body cells share one padding so the columns line up. */
const CELL_CLASS_NAME = classNames(
  'kicl-padding-block-narrow',
  'kicl-padding-inline-narrower'
);

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
      'Skeleton - manifest schema and registry, Job Service, the generic workflow interpreter, two primitives, one real App end-to-end.',
    time: '2 weeks',
  },
  {
    phase: 2,
    scope:
      'Hardening - provider adapters with webhooks and idempotency, credits hold and settle, SSE progress, task metrics dashboard.',
    time: '2 weeks',
  },
  {
    phase: 3,
    scope:
      'Video primitives and the ffmpeg pool, three flagship Apps, App Studio v0 with sandboxed runs and versioned publish.',
    time: '2-3 weeks',
  },
  {
    phase: 4,
    scope:
      'Agent MVP - runtime loop on Temporal, tool registry projection, session store, draft-final policy, budgets and model routing.',
    time: '2-3 weeks',
  },
  {
    phase: 5,
    scope:
      'Eval harness - golden briefs, process checks, judge rubric, replay - plus canary machinery.',
    time: '1-2 weeks',
  },
];

const Phases: React.FunctionComponent = () => (
  <table className={classNames(CLASS_NAME, 'kicl-inline-size-full')}>
    <caption className='kicl-hidden'>Build phases, scope and time</caption>
    <thead>
      <tr>
        <th className={classNames(CELL_CLASS_NAME, TH_CLASS_NAME)} scope='col'>
          Phase
        </th>
        <th className={classNames(CELL_CLASS_NAME, TH_CLASS_NAME)} scope='col'>
          Scope
        </th>
        <th className={classNames(CELL_CLASS_NAME, TH_CLASS_NAME)} scope='col'>
          Time
        </th>
      </tr>
    </thead>
    <tbody>
      {PHASES.map(({ phase, scope, time }) => (
        <tr key={phase}>
          <th
            className={classNames(
              CELL_CLASS_NAME,
              'kicl-font-weight',
              'kicl-text-align-start'
            )}
            scope='row'
          >
            {phase}
          </th>
          <td className={CELL_CLASS_NAME}>{scope}</td>
          <td className={classNames(CELL_CLASS_NAME, 'kicl-text-nowrap')}>
            {time}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export { CLASS_NAME, Phases };
