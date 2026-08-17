import type { Spec } from './Spec';

/** Part 2 — the agent plane's data model, keyed into Part 1's tables. */
const sessionModel: Spec = {
  description:
    'Entity relationship diagram: a Session advances by Turns, each Turn issues Tool Calls, and every Tool Call executes as a Part 1 Job — so cost, retries, and lineage reuse the existing tables.',
  width: 960,
  height: 400,
  nodes: [
    {
      title: 'SESSION',
      x: 40,
      y: 60,
      w: 250,
      h: 180,
      rows: [
        { type: 'uuid', name: 'id', key: 'PK' },
        { type: 'uuid', name: 'user_guid' },
        { type: 'int', name: 'credit_budget' },
        { type: 'int', name: 'credits_spent' },
        { type: 'jsonb', name: 'plan', note: 'checkpoints' },
        { type: 'string', name: 'state' },
      ],
    },
    {
      title: 'TURN',
      x: 370,
      y: 72,
      w: 250,
      h: 156,
      rows: [
        { type: 'uuid', name: 'id', key: 'PK' },
        { type: 'uuid', name: 'session_id', key: 'FK' },
        { type: 'int', name: 'turn_index' },
        { type: 'jsonb', name: 'context_ref', note: 'compacted' },
        { type: 'string', name: 'state' },
      ],
    },
    {
      title: 'TOOL_CALL',
      x: 690,
      y: 72,
      w: 240,
      h: 156,
      rows: [
        { type: 'uuid', name: 'id', key: 'PK' },
        { type: 'uuid', name: 'turn_id', key: 'FK' },
        { type: 'string', name: 'tool', note: 'primitive · App' },
        { type: 'jsonb', name: 'args' },
        { type: 'uuid', name: 'job_id', key: 'FK' },
      ],
    },
    {
      title: 'JOB',
      lines: ['the existing Part 1 table'],
      x: 700,
      y: 292,
      w: 220,
      h: 64,
    },
  ],
  edges: [
    {
      points: [
        [290, 130],
        [370, 130],
      ],
      accent: 'green',
      label: 'advances by',
      lx: 330,
      ly: 118,
    },
    {
      points: [
        [620, 130],
        [690, 130],
      ],
      accent: 'green',
      label: 'issues',
      lx: 655,
      ly: 118,
    },
    {
      points: [
        [810, 228],
        [810, 300],
      ],
      accent: 'green',
      label: 'executes as',
      lx: 822,
      ly: 268,
      anchor: 'start',
    },
  ],
};

export default sessionModel;
