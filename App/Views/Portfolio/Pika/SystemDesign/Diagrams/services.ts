import type { Spec } from './Spec';

/** Services and components — control plane, execution plane, data & delivery. */
const services: Spec = {
  description:
    'Service diagram: clients reach an API gateway; a control plane holds the App Registry, Job Service, Credits and Moderation; an execution plane holds the Orchestrator, task queues, worker fleet and provider adapters; data and delivery cover Postgres, the asset store and CDN, the event bus, the realtime gateway and observability.',
  width: 1000,
  height: 640,
  groups: [
    { label: 'Clients', x: 20, y: 40, w: 150, h: 180 },
    { label: 'Control plane', x: 430, y: 20, w: 250, h: 270 },
    { label: 'Execution plane', x: 430, y: 310, w: 250, h: 300 },
    { label: 'Data & delivery', x: 740, y: 20, w: 240, h: 590 },
  ],
  nodes: [
    { title: 'Web app', x: 35, y: 70, w: 120, h: 44 },
    { title: 'Mobile', x: 35, y: 140, w: 120, h: 44 },
    {
      title: 'API Gateway',
      lines: ['auth · rate limit'],
      x: 220,
      y: 100,
      w: 150,
      h: 60,
    },
    {
      title: 'App Registry',
      lines: ['manifests · versions'],
      x: 450,
      y: 50,
      w: 210,
      h: 54,
    },
    {
      title: 'Job Service',
      lines: ['create · query · cancel'],
      x: 450,
      y: 114,
      w: 210,
      h: 54,
    },
    { title: 'Credits & Billing', x: 450, y: 178, w: 210, h: 44 },
    { title: 'Moderation', x: 450, y: 232, w: 210, h: 44 },
    {
      title: 'Orchestrator',
      lines: ['durable DAG engine'],
      x: 450,
      y: 340,
      w: 210,
      h: 54,
    },
    {
      title: 'Task queues',
      lines: ['per primitive class'],
      shape: 'queue',
      x: 450,
      y: 404,
      w: 210,
      h: 54,
    },
    { title: 'Worker fleet', x: 450, y: 468, w: 210, h: 40 },
    {
      title: 'Provider adapters',
      lines: ['video · image · vision · llm'],
      x: 450,
      y: 518,
      w: 210,
      h: 60,
    },
    {
      title: 'Postgres',
      lines: ['jobs · tasks · ledger'],
      shape: 'cylinder',
      x: 760,
      y: 60,
      w: 200,
      h: 70,
    },
    {
      title: 'Asset store + CDN',
      shape: 'cylinder',
      x: 760,
      y: 150,
      w: 200,
      h: 60,
    },
    { title: 'Event bus', shape: 'queue', x: 760, y: 230, w: 200, h: 44 },
    {
      title: 'Realtime gateway',
      lines: ['SSE / WebSocket'],
      x: 760,
      y: 294,
      w: 200,
      h: 54,
    },
    {
      title: 'Observability',
      lines: ['task metrics · cost'],
      x: 760,
      y: 368,
      w: 200,
      h: 64,
    },
  ],
  edges: [
    {
      points: [
        [155, 92],
        [190, 92],
        [190, 120],
        [220, 120],
      ],
    },
    {
      points: [
        [155, 162],
        [190, 162],
        [190, 140],
        [220, 140],
      ],
    },
    {
      points: [
        [370, 115],
        [410, 115],
        [410, 77],
        [450, 77],
      ],
    },
    {
      points: [
        [370, 130],
        [410, 130],
        [410, 141],
        [450, 141],
      ],
    },
    {
      points: [
        [370, 145],
        [410, 145],
        [410, 200],
        [450, 200],
      ],
    },
    {
      points: [
        [660, 141],
        [710, 141],
        [710, 367],
        [660, 367],
      ],
      label: 'start',
      lx: 714,
      ly: 258,
      anchor: 'start',
    },
    {
      points: [
        [555, 394],
        [555, 404],
      ],
    },
    {
      points: [
        [555, 458],
        [555, 468],
      ],
    },
    {
      points: [
        [555, 508],
        [555, 518],
      ],
    },
    {
      points: [
        [660, 548],
        [700, 548],
        [700, 488],
        [660, 488],
      ],
      dashed: true,
      label: 'webhooks · poll',
      lx: 704,
      ly: 522,
      anchor: 'start',
    },
    {
      points: [
        [660, 478],
        [724, 478],
        [724, 180],
        [760, 180],
      ],
      label: 'assets',
      lx: 728,
      ly: 336,
      anchor: 'start',
    },
    {
      points: [
        [660, 355],
        [690, 355],
        [690, 95],
        [760, 95],
      ],
      label: 'state',
      lx: 686,
      ly: 230,
      anchor: 'end',
    },
    {
      points: [
        [660, 380],
        [742, 380],
        [742, 252],
        [760, 252],
      ],
      label: 'events',
      lx: 738,
      ly: 320,
      anchor: 'end',
    },
    {
      points: [
        [860, 274],
        [860, 294],
      ],
    },
    {
      points: [
        [760, 302],
        [95, 302],
        [95, 184],
      ],
      dashed: true,
      label: 'SSE progress',
      lx: 300,
      ly: 294,
    },
    {
      points: [
        [960, 252],
        [974, 252],
        [974, 400],
        [960, 400],
      ],
    },
    {
      points: [
        [450, 254],
        [420, 254],
        [420, 141],
        [450, 141],
      ],
      dashed: true,
      label: 'pre',
      lx: 414,
      ly: 200,
      anchor: 'end',
    },
    {
      points: [
        [555, 276],
        [555, 340],
      ],
      dashed: true,
      label: 'post',
      lx: 565,
      ly: 312,
      anchor: 'start',
    },
  ],
};

export default services;
