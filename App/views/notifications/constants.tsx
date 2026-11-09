import React from 'react';

// Components
import type { NotificationProps } from 'design/components';

// Icons
import * as Bs from 'react-icons/bs';

type Look = Pick<NotificationProps, 'avatar' | 'level'> & { running?: boolean };

const RUNNING: Look = {
  avatar: <Bs.BsArrowClockwise aria-hidden className='is-revolving' />,
  running: true,
};

const FAILED: Look = {
  avatar: <Bs.BsExclamationCircle aria-hidden />,
  level: 'error',
};

const LOOKS: Record<string, Look> = {
  agent_reply_failure: FAILED,
  agent_reply_question: { avatar: <Bs.BsQuestionCircle aria-hidden /> },
  agent_reply_refusal: {
    avatar: <Bs.BsExclamationCircle aria-hidden />,
    level: 'warning',
  },
  agent_reply_running: RUNNING,
  agent_reply_text: { avatar: <Bs.BsChat aria-hidden /> },
  'api:kinetic_light_error': FAILED,
  found_chords: RUNNING,
  found_notes: RUNNING,
  password_change_done: {
    avatar: <Bs.BsShieldCheck aria-hidden />,
    level: 'confirm',
  },
  password_change_expired: {
    avatar: <Bs.BsClock aria-hidden />,
    level: 'warning',
  },
  password_change_failed: FAILED,
  password_change_waiting: RUNNING,
  picture_ready: { avatar: <Bs.BsImage aria-hidden /> },
  plate_drawing: RUNNING,
  plate_failed: FAILED,
  plate_ready: { avatar: <Bs.BsImage aria-hidden /> },
  progress_chords: RUNNING,
  progress_notes: RUNNING,
  ready_to_play: { avatar: <Bs.BsMusicNoteBeamed aria-hidden /> },
  status_running: RUNNING,
};

export { LOOKS };
