import React from 'react';

// Components
import { Spinner, type NotificationProps } from 'design/components';

// Icons
import * as Tb from 'react-icons/tb';

type Look = Pick<NotificationProps, 'avatar' | 'level'> & { running?: boolean };

const RUNNING: Look = {
  avatar: <Spinner position='inline' />,
  running: true,
};

const FAILED: Look = {
  avatar: <Tb.TbAlertCircle aria-hidden />,
  level: 'error',
};

const LOOKS: Record<string, Look> = {
  agent_reply_failure: FAILED,
  agent_reply_question: { avatar: <Tb.TbHelpCircle aria-hidden /> },
  agent_reply_refusal: {
    avatar: <Tb.TbAlertCircle aria-hidden />,
    level: 'warning',
  },
  agent_reply_running: RUNNING,
  agent_reply_text: { avatar: <Tb.TbMessage aria-hidden /> },
  'api:kinetic_light_error': FAILED,
  found_chords: RUNNING,
  found_notes: RUNNING,
  password_change_done: {
    avatar: <Tb.TbShieldCheck aria-hidden />,
    level: 'confirm',
  },
  password_change_expired: {
    avatar: <Tb.TbClock aria-hidden />,
    level: 'warning',
  },
  password_change_failed: FAILED,
  password_change_waiting: RUNNING,
  picture_ready: { avatar: <Tb.TbPhoto aria-hidden /> },
  plate_drawing: RUNNING,
  plate_failed: FAILED,
  plate_ready: { avatar: <Tb.TbPhoto aria-hidden /> },
  progress_chords: RUNNING,
  progress_notes: RUNNING,
  ready_to_play: { avatar: <Tb.TbMusic aria-hidden /> },
  status_running: RUNNING,
};

const lookOf = ({
  key,
  values,
}: {
  key: string;
  values: { context?: string };
}) => {
  return LOOKS[`${key}_${values.context}`] ?? LOOKS[key] ?? {};
};

export { LOOKS, lookOf };
