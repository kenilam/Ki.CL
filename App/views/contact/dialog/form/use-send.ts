import { useCallback } from 'react';

import {
  Kicl_ContactDocument,
  useMutation,
  type ContactInput,
} from 'api/provider';

// Spec
import type { Values } from './spec';

// Session
import { useChallenged } from '@/session';

/**
 * The API sends only for a session that passed the Turnstile check, so a
 * session that has not is checked first and the message sent again.
 */
const useSend = () => {
  const [contact] = useMutation(Kicl_ContactDocument);

  const challenged = useChallenged();

  return useCallback(
    ({ email, message }: Values) => {
      return challenged(() => {
        return contact({
          variables: {
            contact: { email: email as ContactInput['email'], message },
          },
        });
      });
    },
    [challenged, contact]
  );
};

export { useSend };
