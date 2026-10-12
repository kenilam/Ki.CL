import type { DiagramSpec as Spec } from 'design/components';
import type { TFunction } from 'i18next';

/** Part 2 - the new agent plane beside the unchanged Part 1 services. */
const agentPlane = (t: TFunction<'pika'>): Spec => ({
  title: t('diagram.agent_plane.title'),
  description: t('diagram.agent_plane.description'),
  width: 1000,
  height: 560,
  groups: [
    { label: t('diagram.agent_plane.group_new'), x: 20, y: 20, w: 560, h: 520 },
    {
      label: t('diagram.agent_plane.group_unchanged'),
      x: 640,
      y: 20,
      w: 340,
      h: 520,
    },
  ],
  nodes: [
    {
      id: 'chat',
      title: t('diagram.agent_plane.node_chat'),
      lines: [t('diagram.agent_plane.line_chat')],
      x: 40,
      y: 60,
      w: 180,
      h: 54,
    },
    {
      id: 'art',
      title: t('diagram.agent_plane.node_runtime'),
      lines: [t('diagram.agent_plane.line_runtime')],
      x: 230,
      y: 150,
      w: 170,
      h: 60,
    },
    {
      id: 'sess',
      title: t('diagram.agent_plane.node_session'),
      lines: [t('diagram.agent_plane.line_session')],
      shape: 'cylinder',
      x: 40,
      y: 150,
      w: 150,
      h: 70,
    },
    {
      id: 'tools',
      title: t('diagram.agent_plane.node_tools'),
      lines: [t('diagram.agent_plane.line_tools')],
      x: 410,
      y: 60,
      w: 150,
      h: 64,
    },
    {
      id: 'gov',
      title: t('diagram.agent_plane.node_governor'),
      lines: [t('diagram.agent_plane.line_governor')],
      x: 410,
      y: 250,
      w: 150,
      h: 64,
    },
    {
      id: 'eval',
      title: t('diagram.agent_plane.node_eval'),
      lines: [t('diagram.agent_plane.line_eval')],
      x: 40,
      y: 300,
      w: 170,
      h: 60,
    },
    {
      id: 'jobs',
      title: t('component', { context: 'job_service' }),
      x: 670,
      y: 60,
      w: 140,
      h: 44,
    },
    {
      id: 'orch',
      title: t('component', { context: 'orchestrator' }),
      lines: [t('diagram.agent_plane.line_orchestrator')],
      x: 670,
      y: 130,
      w: 140,
      h: 54,
    },
    {
      id: 'pad',
      title: t('component', { context: 'provider_adapters' }),
      x: 670,
      y: 210,
      w: 140,
      h: 44,
    },
    {
      id: 's3',
      title: t('diagram.agent_plane.node_assets'),
      shape: 'cylinder',
      x: 840,
      y: 130,
      w: 120,
      h: 60,
    },
    {
      id: 'cred',
      title: t('diagram.agent_plane.node_credits'),
      x: 670,
      y: 300,
      w: 140,
      h: 40,
    },
    {
      id: 'mod',
      title: t('component', { context: 'moderation' }),
      x: 670,
      y: 360,
      w: 140,
      h: 40,
    },
    {
      id: 'obs',
      title: t('component', { context: 'observability' }),
      x: 670,
      y: 420,
      w: 140,
      h: 40,
    },
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
      label: t('diagram.agent_plane.edge_jobs'),
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
      label: t('diagram.agent_plane.edge_replays'),
      lx: 200,
      ly: 252,
    },
  ],
});

export { agentPlane };
