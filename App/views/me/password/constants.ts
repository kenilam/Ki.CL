/** Route segments, under the `me` route. */
const PATH = 'password';
const CONFIRM_PATH = 'confirm';

const COPY = {
  title: 'Change password',
  description: 'We email you a link to confirm the change.',
  currentPassword: 'Current password',
  password: 'New password',
  send: 'Email me the link',
  waiting: 'Check your email',
  sentTo: 'We sent a link to',
  keepOpen: 'It works for 10 minutes. Keep this page open.',
  saving: 'Changing your password',
  done: 'Password changed',
  expired: 'The link expired',
  failed: 'Could not change your password',
  again: 'Start again',
  back: 'Back to my profile',
  goBack: 'Go Back',
};

const CONFIRM_COPY = {
  title: 'Confirm your password change',
  description: 'Only confirm if you asked to change your password.',
  confirm: 'Confirm',
  confirmed: 'Confirmed',
  return:
    'Go back to the page where you started. It finishes there. You can close this tab.',
  invalid: 'This link has expired or was already used.',
};

export { CONFIRM_COPY, CONFIRM_PATH, COPY, PATH };
