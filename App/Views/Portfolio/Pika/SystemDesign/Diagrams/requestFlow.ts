import type { Spec } from './Spec';

const ACTORS = [
  { title: 'Client', x: 110 },
  { title: 'Job Service', x: 300 },
  { title: 'Orchestrator', x: 490 },
  { title: 'Worker', x: 680 },
  { title: 'Provider', x: 870 },
];

const TOP = 20;
const BOTTOM = 580;

/** Request flow - one job from submission to delivered assets. */
const requestFlow: Spec = {
  description:
    'Sequence diagram of a job: the client posts a job, the Job Service validates and reserves credits, the Orchestrator schedules tasks onto workers and providers, progress streams back over server-sent events, and credits settle on completion.',
  width: 960,
  height: 640,
  nodes: ACTORS.flatMap(({ title, x }) => [
    { title, x: x - 75, y: TOP, w: 150, h: 40 },
    { title, x: x - 75, y: BOTTOM, w: 150, h: 40 },
  ]),
  edges: [
    ...ACTORS.map(({ x }) => ({
      points: [
        [x, TOP + 40],
        [x, BOTTOM],
      ] as Array<[number, number]>,
      dashed: true,
    })),
    {
      points: [
        [110, 100],
        [300, 100],
      ],
      accent: 'green',
      label: '1 · POST /jobs { app, version, inputs }',
      lx: 205,
      ly: 90,
    },
    {
      points: [
        [300, 140],
        [340, 140],
        [340, 158],
        [300, 158],
      ],
      accent: 'green',
      label: '2 · validate · hold credits · moderate',
      lx: 350,
      ly: 152,
      anchor: 'start',
    },
    {
      points: [
        [300, 195],
        [490, 195],
      ],
      accent: 'green',
      label: '3 · start RunAppWorkflow',
      lx: 395,
      ly: 185,
    },
    {
      points: [
        [300, 235],
        [110, 235],
      ],
      dashed: true,
      label: '4 · 202 { job_id }',
      lx: 205,
      ly: 225,
    },
    {
      points: [
        [110, 275],
        [150, 275],
        [150, 293],
        [110, 293],
      ],
      accent: 'green',
      label: '5 · subscribe SSE /jobs/:id/events',
      lx: 160,
      ly: 287,
      anchor: 'start',
    },
    {
      points: [
        [490, 330],
        [680, 330],
      ],
      accent: 'green',
      label: '6 · schedule task (idempotency key)',
      lx: 585,
      ly: 320,
    },
    {
      points: [
        [680, 370],
        [870, 370],
      ],
      accent: 'green',
      label: '7 · generate (async)',
      lx: 775,
      ly: 360,
    },
    {
      points: [
        [870, 410],
        [680, 410],
      ],
      dashed: true,
      label: '8 · webhook · complete / failed',
      lx: 775,
      ly: 400,
    },
    {
      points: [
        [680, 450],
        [490, 450],
      ],
      accent: 'green',
      label: '9 · task result + asset refs',
      lx: 585,
      ly: 440,
    },
    {
      points: [
        [490, 490],
        [110, 490],
      ],
      dashed: true,
      label: '10 · progress events',
      lx: 300,
      ly: 480,
    },
    {
      points: [
        [490, 530],
        [300, 530],
      ],
      accent: 'green',
      label: '11 · job complete → settle credits',
      lx: 395,
      ly: 520,
    },
    {
      points: [
        [110, 555],
        [150, 555],
        [150, 570],
        [110, 570],
      ],
      accent: 'green',
      label: '12 · render gallery from CDN',
      lx: 160,
      ly: 566,
      anchor: 'start',
    },
  ],
};

export default requestFlow;
