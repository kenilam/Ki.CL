import type { DiagramSpec } from '@/components';

/** The pieces and what connects them. */
const overview: DiagramSpec = {
  title: 'How the pieces connect',
  legend: [
    {
      label: 'Dashed',
      value: 'updates and assets come back from the server',
    },
  ],
  description:
    'The browser sends messages to the API over a GraphQL mutation and gets updates back over a subscription. The API keeps conversations, jobs and assets in MongoDB, calls a moderation endpoint and three provider chains for text, vision and images, and uploads pictures to a storage bucket that the browser reads through the site’s assets route.',
  width: 760,
  height: 460,
  nodes: [
    {
      title: 'Browser',
      lines: ['React, Apollo'],
      x: 20,
      y: 150,
      w: 120,
      h: 60,
    },
    {
      title: 'API',
      lines: ['GraphQL resolvers', 'the agent’s turn', 'in-process pub/sub'],
      x: 230,
      y: 120,
      w: 160,
      h: 120,
    },
    {
      title: 'MongoDB',
      lines: ['threads, jobs', 'assets'],
      shape: 'cylinder',
      x: 230,
      y: 300,
      w: 160,
      h: 80,
    },
    {
      title: 'Moderation',
      lines: ['OpenAI omni-moderation'],
      x: 450,
      y: 20,
      w: 290,
      h: 50,
    },
    {
      title: 'Text chain',
      lines: ['gpt-4o-mini → Llama 3.3 → Gemini'],
      x: 450,
      y: 90,
      w: 290,
      h: 60,
    },
    {
      title: 'Vision chain',
      lines: ['gpt-4o → Gemini Flash'],
      x: 450,
      y: 170,
      w: 290,
      h: 60,
    },
    {
      title: 'Image chain',
      lines: ['gpt-image-1 → Flux Schnell', '→ Pollinations → Gemini'],
      x: 450,
      y: 250,
      w: 290,
      h: 70,
    },
    {
      title: 'Storage bucket',
      lines: ['named by content hash'],
      shape: 'cylinder',
      x: 450,
      y: 345,
      w: 290,
      h: 70,
    },
  ],
  edges: [
    {
      accent: 'green',
      points: [
        [140, 165],
        [230, 165],
      ],
      label: 'send',
      lx: 185,
      ly: 157,
    },
    {
      dashed: true,
      points: [
        [230, 200],
        [140, 200],
      ],
      label: 'updates',
      lx: 185,
      ly: 192,
    },
    {
      both: true,
      points: [
        [310, 240],
        [310, 300],
      ],
      label: 'read, write',
      anchor: 'start',
      lx: 318,
      ly: 275,
    },
    {
      points: [
        [390, 135],
        [420, 135],
        [420, 45],
        [450, 45],
      ],
    },
    {
      points: [
        [390, 150],
        [430, 150],
        [430, 120],
        [450, 120],
      ],
    },
    {
      points: [
        [390, 200],
        [450, 200],
      ],
    },
    {
      points: [
        [390, 225],
        [420, 225],
        [420, 285],
        [450, 285],
      ],
    },
    {
      accent: 'green',
      points: [
        [595, 320],
        [595, 345],
      ],
      label: 'upload',
      anchor: 'start',
      lx: 603,
      ly: 337,
    },
    {
      dashed: true,
      points: [
        [80, 210],
        [80, 440],
        [595, 440],
        [595, 415],
      ],
      label: 'pictures through /assets',
      lx: 330,
      ly: 432,
    },
  ],
};

export { overview };
