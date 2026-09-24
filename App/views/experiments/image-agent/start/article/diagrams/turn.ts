import type { DiagramSpec } from '@/components';

const ACTORS = [
  { title: 'Browser', x: 90 },
  { title: 'API', x: 280 },
  { title: 'MongoDB', x: 470 },
  { title: 'Models', x: 660 },
];

const TOP = 20;
const BOTTOM = 530;

type Step = {
  from: number;
  to: number;
  y: number;
  label: string;
  reply?: boolean;
};

/** Arrows between lifelines, a reply dashed. `from === to` loops back. */
const STEPS: Step[] = [
  { from: 90, to: 280, y: 90, label: '1 · ImageAgentSend' },
  { from: 280, to: 280, y: 120, label: '2 · limits, stale turns' },
  { from: 280, to: 470, y: 160, label: '3 · save, set THINKING' },
  { from: 280, to: 90, y: 195, label: '4 · the thread, now', reply: true },
  { from: 280, to: 660, y: 240, label: '5 · check, clarify' },
  { from: 660, to: 280, y: 275, label: 'verdict, brief', reply: true },
  { from: 280, to: 470, y: 315, label: '6 · save each step' },
  { from: 280, to: 90, y: 350, label: '7 · pushed on change', reply: true },
  { from: 280, to: 660, y: 395, label: '8 · draw, review' },
  { from: 660, to: 280, y: 430, label: 'picture, score', reply: true },
  { from: 280, to: 470, y: 470, label: '9 · picture, IDLE' },
  { from: 280, to: 90, y: 505, label: '10 · the picture', reply: true },
];

/** One turn, from the send to the picture. */
const turn: DiagramSpec = {
  title: 'From send to picture',
  legend: [
    { label: 'Step 1–4', value: 'inside the request' },
    { label: 'Step 5', value: 'runs on its own' },
    { label: 'Dashed', value: 'replies' },
  ],
  description:
    'Sequence of one turn. The browser sends the message; the API checks limits and stale turns, saves it and sets the conversation to THINKING, and returns at once. The turn then runs on: checks and the clarifier call the models, each step is saved and pushed to the browser over the subscription, the picture is drawn and reviewed, and the conversation goes back to IDLE with the picture.',
  width: 760,
  height: 550,
  nodes: ACTORS.map(({ title, x }) => ({
    title,
    x: x - 65,
    y: TOP,
    w: 130,
    h: 40,
  })),
  edges: [
    ...ACTORS.map(({ x }) => ({
      dashed: true,
      points: [
        [x, TOP + 40],
        [x, BOTTOM],
      ] as Array<[number, number]>,
    })),
    ...STEPS.map(({ from, label, reply, to, y }) =>
      from === to
        ? {
            accent: 'green' as const,
            anchor: 'start' as const,
            label,
            lx: from + 48,
            ly: y + 11,
            points: [
              [from, y],
              [from + 40, y],
              [from + 40, y + 15],
              [from, y + 15],
            ] as Array<[number, number]>,
          }
        : {
            accent: reply ? undefined : ('green' as const),
            dashed: reply,
            label,
            lx: (from + to) / 2,
            ly: y - 8,
            points: [
              [from, y],
              [to, y],
            ] as Array<[number, number]>,
          }
    ),
  ],
};

export { turn };
