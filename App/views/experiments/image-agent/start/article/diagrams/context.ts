import type { DiagramSpec } from '@/components';

/** Top of the first group, so its label has room above the nodes. */
const T = 50;

/** Top of the second group. */
const B = 400;

/** What each model reads, and the one lookup that retrieves. */
const context: DiagramSpec = {
  title: 'What each model reads',
  legend: [
    { label: 'Top half', value: 'what each model is given' },
    { label: 'Bottom half', value: 'the one lookup that uses no model' },
  ],
  description:
    'The conversation, as Person and Agent lines with refused messages removed, goes to the classifier and the clarifier. The clarifier also reads and updates the brief and style saved on the thread. The prompt writer and the reviewer read only the brief and style. The prompt writer’s prompt goes to the image model, the picture goes to the reviewer, and a failed review sends its notes back to the prompt writer once. Separately, similar conversations are found without a model: the typed text is split into words and compared with word sets from the person’s last 50 conversations, and up to three that share at least 60% come back.',
  width: 760,
  height: 540,
  groups: [
    { label: 'What the models read', x: 10, y: 10, w: 740, h: 360 },
    {
      label: 'Similar conversations, no model',
      x: 10,
      y: B - 20,
      w: 740,
      h: 140,
    },
  ],
  nodes: [
    {
      title: 'Conversation',
      lines: ['Person: / Agent:', 'refused ones removed'],
      shape: 'cylinder',
      x: 30,
      y: T,
      w: 180,
      h: 100,
    },
    {
      title: 'Brief + style',
      lines: ['saved on the thread'],
      shape: 'cylinder',
      x: 30,
      y: T + 180,
      w: 180,
      h: 80,
    },
    { title: 'Classifier', x: 300, y: T, w: 150, h: 45 },
    { title: 'Clarifier', x: 300, y: T + 85, w: 150, h: 45 },
    { title: 'Prompt writer', x: 300, y: T + 175, w: 150, h: 45 },
    { title: 'Reviewer', x: 300, y: T + 265, w: 150, h: 45 },
    { title: 'Image model', x: 560, y: T + 175, w: 170, h: 45 },
    { title: 'Typed text', x: 30, y: B + 30, w: 180, h: 60 },
    {
      title: 'Word sets',
      lines: ['last 50 conversations'],
      x: 280,
      y: B + 30,
      w: 190,
      h: 60,
    },
    {
      title: 'Up to 3',
      lines: ['60% of words shared'],
      x: 560,
      y: B + 30,
      w: 170,
      h: 60,
    },
  ],
  edges: [
    {
      points: [
        [210, T + 22],
        [300, T + 22],
      ],
    },
    {
      points: [
        [210, T + 80],
        [250, T + 80],
        [250, T + 100],
        [300, T + 100],
      ],
    },
    {
      accent: 'green',
      both: true,
      points: [
        [210, T + 200],
        [265, T + 200],
        [265, T + 118],
        [300, T + 118],
      ],
      label: 'reads, updates',
      anchor: 'start',
      lx: 272,
      ly: T + 160,
    },
    {
      accent: 'green',
      points: [
        [210, T + 225],
        [300, T + 225],
      ],
    },
    {
      accent: 'green',
      points: [
        [210, T + 245],
        [245, T + 245],
        [245, T + 288],
        [300, T + 288],
      ],
    },
    {
      accent: 'green',
      points: [
        [450, T + 197],
        [560, T + 197],
      ],
      label: 'prompt',
      lx: 505,
      ly: T + 189,
    },
    {
      accent: 'green',
      points: [
        [645, T + 220],
        [645, T + 288],
        [450, T + 288],
      ],
      label: 'picture',
      lx: 550,
      ly: T + 280,
    },
    {
      dashed: true,
      points: [
        [375, T + 265],
        [375, T + 220],
      ],
      label: 'notes, once',
      anchor: 'start',
      lx: 383,
      ly: T + 247,
    },
    {
      points: [
        [210, B + 60],
        [280, B + 60],
      ],
      label: 'words',
      lx: 245,
      ly: B + 52,
    },
    {
      points: [
        [470, B + 60],
        [560, B + 60],
      ],
      label: 'overlap',
      lx: 515,
      ly: B + 52,
    },
  ],
};

export { context };
