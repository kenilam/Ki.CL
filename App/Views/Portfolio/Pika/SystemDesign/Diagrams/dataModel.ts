import type { Spec } from './Spec';

/** Core data model - entities, attributes, and how records relate. */
const dataModel: Spec = {
  description:
    'Entity relationship diagram: an App publishes immutable App Versions; a Job pins a version, expands into Tasks and Task Attempts served by Providers, and produces Assets; Users own Jobs and are billed via a Credit Ledger.',
  width: 960,
  height: 660,
  nodes: [
    {
      title: 'APP',
      x: 30,
      y: 24,
      w: 230,
      h: 132,
      rows: [
        { type: 'string', name: 'id', key: 'PK' },
        { type: 'string', name: 'owner_team' },
        { type: 'string', name: 'status', note: 'draft → archived' },
        { type: 'int', name: 'live_version' },
      ],
    },
    {
      title: 'APP_VERSION',
      x: 30,
      y: 236,
      w: 230,
      h: 132,
      rows: [
        { type: 'string', name: 'app_id', key: 'FK' },
        { type: 'int', name: 'version', key: 'PK' },
        { type: 'jsonb', name: 'manifest' },
        { type: 'string', name: 'created_by' },
      ],
    },
    {
      title: 'JOB',
      x: 360,
      y: 180,
      w: 270,
      h: 180,
      rows: [
        { type: 'uuid', name: 'id', key: 'PK' },
        { type: 'string', name: 'app_id' },
        { type: 'int', name: 'app_version', note: 'pinned' },
        { type: 'jsonb', name: 'inputs' },
        { type: 'string', name: 'state', note: 'queued → canceled' },
        { type: 'int', name: 'credits_reserved' },
      ],
    },
    { title: 'USER', x: 740, y: 60, w: 180, h: 48 },
    { title: 'CREDIT_LEDGER', x: 740, y: 180, w: 180, h: 48 },
    {
      title: 'TASK',
      x: 330,
      y: 420,
      w: 250,
      h: 180,
      rows: [
        { type: 'uuid', name: 'id', key: 'PK' },
        { type: 'uuid', name: 'job_id', key: 'FK' },
        { type: 'string', name: 'node_id', note: 'DAG node' },
        { type: 'string', name: 'state' },
        { type: 'jsonb', name: 'output_ref' },
        { type: 'string', name: 'idempotency_key' },
      ],
    },
    {
      title: 'ASSET',
      x: 680,
      y: 420,
      w: 250,
      h: 108,
      rows: [
        { type: 'uuid', name: 'id', key: 'PK' },
        { type: 'string', name: 'uri', note: 'S3 + CDN' },
        { type: 'jsonb', name: 'metadata', note: 'seed · lineage' },
      ],
    },
    { title: 'TASK_ATTEMPT', x: 60, y: 480, w: 170, h: 48 },
    { title: 'PROVIDER', x: 60, y: 580, w: 170, h: 48 },
  ],
  edges: [
    {
      points: [
        [145, 156],
        [145, 236],
      ],
      accent: 'green',
      label: 'publishes 1‥N',
      lx: 158,
      ly: 200,
      anchor: 'start',
    },
    {
      points: [
        [260, 290],
        [360, 290],
      ],
      accent: 'green',
      label: 'instantiates',
      lx: 310,
      ly: 278,
    },
    {
      points: [
        [740, 84],
        [560, 84],
        [560, 180],
      ],
      accent: 'green',
      label: 'owns',
      lx: 575,
      ly: 130,
      anchor: 'start',
    },
    {
      points: [
        [830, 108],
        [830, 180],
      ],
      accent: 'green',
      label: 'billed via',
      lx: 842,
      ly: 148,
      anchor: 'start',
    },
    {
      points: [
        [455, 360],
        [455, 420],
      ],
      accent: 'green',
      label: 'expands DAG into',
      lx: 468,
      ly: 394,
      anchor: 'start',
    },
    {
      points: [
        [630, 330],
        [805, 330],
        [805, 420],
      ],
      accent: 'green',
      label: 'produces',
      lx: 700,
      ly: 318,
    },
    {
      points: [
        [330, 504],
        [230, 504],
      ],
      accent: 'green',
      label: 'retries as',
      lx: 280,
      ly: 492,
    },
    {
      points: [
        [145, 528],
        [145, 580],
      ],
      accent: 'green',
      label: 'served by',
      lx: 158,
      ly: 558,
      anchor: 'start',
    },
  ],
};

export default dataModel;
