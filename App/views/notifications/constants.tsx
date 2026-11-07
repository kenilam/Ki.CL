import React from 'react';

// Components
import type { NotificationProps } from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

// Paths
import { toPath as toThreadPath } from '@/views/experiments/image-agent/constants';
import { toPath as toSongPath } from '@/views/experiments/kinetic-light/constants';
import { toPath as toPlatePath } from '@/views/experiments/tree-of-life/explorer/details/constants';
import { PAGE_PATH } from '@/views/me/password/constants';

type Look = Pick<NotificationProps, 'avatar' | 'level'> & { running?: boolean };

const RUNNING: Look = {
  avatar: <Ri.RiLoader4Line aria-hidden className='is-revolving' />,
  running: true,
};

const FAILED: Look = {
  avatar: <Ri.RiErrorWarningLine aria-hidden />,
  level: 'error',
};

const LINKS: Record<string, (documentId: string) => string> = {
  image_agent_threads: toThreadPath,
  kinetic_light_readings: toSongPath,
  password_changes: () => PAGE_PATH,
  tree_of_life: toPlatePath,
};

const LOOKS: Record<string, Look> = {
  'agent_reply_failure': FAILED,
  'agent_reply_question': { avatar: <Ri.RiQuestionLine aria-hidden /> },
  'agent_reply_refusal': {
    avatar: <Ri.RiErrorWarningLine aria-hidden />,
    level: 'warning',
  },
  'agent_reply_running': RUNNING,
  'agent_reply_text': { avatar: <Ri.RiChat3Line aria-hidden /> },
  'api:kinetic_light_error': FAILED,
  'found_chords': RUNNING,
  'found_notes': RUNNING,
  'password_change_done': {
    avatar: <Ri.RiShieldCheckLine aria-hidden />,
    level: 'confirm',
  },
  'password_change_expired': {
    avatar: <Ri.RiTimeLine aria-hidden />,
    level: 'warning',
  },
  'password_change_failed': FAILED,
  'password_change_waiting': RUNNING,
  'picture_ready': { avatar: <Ri.RiImageLine aria-hidden /> },
  'plate_drawing': RUNNING,
  'plate_failed': FAILED,
  'plate_ready': { avatar: <Ri.RiImageLine aria-hidden /> },
  'progress_chords': RUNNING,
  'progress_notes': RUNNING,
  'ready_to_play': { avatar: <Ri.RiMusic2Line aria-hidden /> },
  'status_running': RUNNING,
};

export { LINKS, LOOKS };
