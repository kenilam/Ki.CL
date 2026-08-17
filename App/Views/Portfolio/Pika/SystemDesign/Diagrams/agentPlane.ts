import type { Spec } from './Spec';

/** Part 2 — the new agent plane beside the unchanged Part 1 services. */
const agentPlane: Spec = {
  description:
    'Diagram of the agent plane — chat gateway, agent runtime, tool registry, session store, cost governor and eval harness — beside the unchanged Part 1 services: Job Service, Orchestrator, provider adapters, asset store, credits, moderation and observability.',
  width: 1000,
  height: 560,
  groups: [
    { label: 'New — agent plane', x: 20, y: 20, w: 560, h: 520 },
    { label: 'Unchanged from Part 1', x: 640, y: 20, w: 340, h: 520 },
  ],
  nodes: [
    {
      title: 'Chat gateway',
      lines: ['streaming UI'],
      x: 40,
      y: 60,
      w: 180,
      h: 54,
    },
    {
      title: 'Agent Runtime',
      lines: ['the loop'],
      x: 230,
      y: 150,
      w: 170,
      h: 60,
    },
    {
      title: 'Session store',
      lines: ['messages · plan'],
      shape: 'cylinder',
      x: 40,
      y: 150,
      w: 150,
      h: 70,
    },
    {
      title: 'Tool Registry',
      lines: ['primitives + Apps'],
      x: 410,
      y: 60,
      w: 150,
      h: 64,
    },
    {
      title: 'Cost governor',
      lines: ['budgets · router'],
      x: 410,
      y: 250,
      w: 150,
      h: 64,
    },
    {
      title: 'Eval harness',
      lines: ['rubrics · replay'],
      x: 40,
      y: 300,
      w: 170,
      h: 60,
    },
    { title: 'Job Service', x: 670, y: 60, w: 140, h: 44 },
    {
      title: 'Orchestrator',
      lines: ['durable DAG'],
      x: 670,
      y: 130,
      w: 140,
      h: 54,
    },
    {
      title: 'Provider adapters',
      x: 670,
      y: 210,
      w: 140,
      h: 44,
    },
    {
      title: 'Asset store',
      shape: 'cylinder',
      x: 840,
      y: 130,
      w: 120,
      h: 60,
    },
    { title: 'Credits', x: 670, y: 300, w: 140, h: 40 },
    { title: 'Moderation', x: 670, y: 360, w: 140, h: 40 },
    { title: 'Observability', x: 670, y: 420, w: 140, h: 40 },
  ],
  edges: [
    {
      points: [
        [130, 114],
        [130, 180],
        [230, 180],
      ],
    },
    {
      points: [
        [230, 195],
        [190, 195],
      ],
      both: true,
    },
    {
      points: [
        [315, 150],
        [315, 92],
        [410, 92],
      ],
    },
    {
      points: [
        [560, 92],
        [615, 92],
        [615, 82],
        [670, 82],
      ],
      accent: 'green',
      label: 'jobs',
      lx: 616,
      ly: 72,
    },
    {
      points: [
        [740, 104],
        [740, 130],
      ],
    },
    {
      points: [
        [740, 184],
        [740, 210],
      ],
    },
    {
      points: [
        [810, 157],
        [840, 157],
      ],
    },
    {
      points: [
        [400, 190],
        [485, 190],
        [485, 250],
      ],
    },
    {
      points: [
        [125, 300],
        [125, 262],
        [280, 262],
        [280, 210],
      ],
      dashed: true,
      label: 'replays',
      lx: 200,
      ly: 252,
    },
  ],
};

export default agentPlane;
