import type { DiagramSpec } from '@/components';

// Icons
import { Ri } from '@/icons';

/** The limits, and the schema they sit behind. */
const allowance: DiagramSpec = {
  title: 'Limits and the schema',
  legend: [
    { label: 'Green', value: 'validate on every request', accent: 'confirm' },
    { label: 'Dashed', value: 'what ImageAgentAllowance reports back' },
  ],
  description:
    'Per person: one turn running at a time, five seconds between messages, 40 messages and five pictures a day. Across everyone: 1,000 messages and 200 pictures a day, and 10 new people an hour. Both sets are checked when ImageAgentSend runs, which takes a thread id and the text. The ImageAgentAllowance query reports the person’s remaining pictures, the limit, when the next message is allowed, whether a turn is busy, and the running conversations.',
  width: 660,
  height: 346,
  nodes: [
    {
      title: 'Per person',
      rows: [
        { icon: Ri.RiPlayCircleLine, name: 'One turn running at a time' },
        { icon: Ri.RiTimerLine, name: 'Five seconds between messages' },
        { icon: Ri.RiChat3Line, name: '40 messages a day' },
        { icon: Ri.RiImageLine, name: 'Five pictures a day' },
      ],
      x: 20,
      y: 40,
      w: 300,
      h: 130,
    },
    {
      title: 'Across everyone',
      rows: [
        { icon: Ri.RiChat3Line, name: '1,000 messages a day' },
        { icon: Ri.RiImageLine, name: '200 pictures a day' },
        { icon: Ri.RiUserAddLine, name: '10 new people an hour' },
      ],
      x: 20,
      y: 200,
      w: 300,
      h: 106,
    },
    {
      title: 'query ImageAgentAllowance',
      rows: [
        { name: 'remaining', note: 'Int' },
        { name: 'limit', note: 'Int' },
        { name: 'nextAllowedAt', note: 'DateTime' },
        { name: 'busy', note: 'Boolean' },
        { name: 'running', note: '[Thread]' },
      ],
      x: 380,
      y: 40,
      w: 260,
      h: 154,
    },
    {
      title: 'mutation ImageAgentSend',
      rows: [
        { type: 'arg', name: 'threadId' },
        { type: 'arg', name: 'text' },
        { type: 'returns', name: 'the thread' },
      ],
      x: 380,
      y: 220,
      w: 260,
      h: 106,
    },
  ],
  edges: [
    {
      dashed: true,
      points: [
        [320, 100],
        [380, 100],
      ],
    },
    {
      accent: 'green',
      points: [
        [320, 150],
        [345, 150],
        [345, 250],
        [380, 250],
      ],
    },
    {
      accent: 'green',
      points: [
        [320, 285],
        [380, 285],
      ],
    },
  ],
};

export { allowance };
