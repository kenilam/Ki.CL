import type { DiagramSpec } from 'design/components';
import type { TFunction } from 'i18next';

// Icons
import * as Ri from 'react-icons/ri';

/** The limits, and the schema they sit behind. */
const allowance = (t: TFunction<'image-agent'>): DiagramSpec => ({
  title: t('diagram.allowance.title'),
  legend: [
    {
      label: t('diagram.label', { context: 'green' }),
      value: t('diagram.allowance.legend', { context: 'green' }),
      accent: 'confirm',
    },
    {
      label: t('diagram.label', { context: 'dashed' }),
      value: t('diagram.allowance.legend', { context: 'dashed' }),
    },
  ],
  description: t('diagram.allowance.description'),
  width: 660,
  height: 346,
  nodes: [
    {
      title: t('diagram.allowance.node', { context: 'person' }),
      rows: [
        {
          icon: Ri.RiPlayCircleLine,
          name: t('diagram.allowance.row', { context: 'turn' }),
        },
        {
          icon: Ri.RiTimerLine,
          name: t('diagram.allowance.row', { context: 'gap' }),
        },
        {
          icon: Ri.RiChat3Line,
          name: t('diagram.allowance.row', { context: 'messages_person' }),
        },
        {
          icon: Ri.RiImageLine,
          name: t('diagram.allowance.row', { context: 'pictures_person' }),
        },
      ],
      x: 20,
      y: 40,
      w: 300,
      h: 130,
    },
    {
      title: t('diagram.allowance.node', { context: 'everyone' }),
      rows: [
        {
          icon: Ri.RiChat3Line,
          name: t('diagram.allowance.row', { context: 'messages_everyone' }),
        },
        {
          icon: Ri.RiImageLine,
          name: t('diagram.allowance.row', { context: 'pictures_everyone' }),
        },
        {
          icon: Ri.RiUserAddLine,
          name: t('diagram.allowance.row', { context: 'people' }),
        },
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
        {
          type: 'returns',
          name: t('diagram.allowance.row', { context: 'returns' }),
        },
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
});

export { allowance };
