import React from 'react';

// Components
import { Dialog as Origin, Spinner } from 'design/components';

// Context
import { useSignOutContext } from '@/views/account/sign-out/context';

// Partials
import { Actions } from './actions';
import { Failed } from './failed';
import { Message } from './message';
import { Title } from './title';

// Constants
import {
  SIGN_OUT_ID,
  SIGN_OUT_MESSAGE_ID,
  SIGN_OUT_TITLE_ID,
} from '@/views/account/constants';

/**
 * Asks before signing out, then waits in place while the session is
 * replaced. It goes away with the account around it, once the page knows the
 * visitor is anonymous.
 */
const Dialog: React.FunctionComponent = () => {
  const { pending } = useSignOutContext();

  return (
    <Origin
      aria-describedby={SIGN_OUT_MESSAGE_ID}
      aria-labelledby={SIGN_OUT_TITLE_ID}
      closable={pending ? false : 'keyboard'}
      id={SIGN_OUT_ID}
      role='alertdialog'
    >
      <Title />
      <Message />
      <Spinner in={pending} position='inline' />
      <Failed />
      <Actions />
    </Origin>
  );
};

export { Dialog };
