import React, { useCallback, useState } from 'react';

import {
  Kicl_ContactDocument,
  useMutation,
  type ContactInput,
} from 'api/provider';

// Components
import { Dialog } from 'design/components';

// Widgets
import { ContactForm, type ContactFormValues } from 'design/widgets';

// Session
import { useChallenged } from '@/session';

// Views
import { useAccount } from '@/views/account/use-account';

// Constants
import { CONTACT_ID, COPY } from './constants';

/**
 * The form the site offers in place of an email address. The API sends only
 * for a session that passed the Turnstile check, so a session that has not is
 * checked first and the message sent again.
 */
const Contact: React.FunctionComponent = () => {
  const [contact] = useMutation(Kicl_ContactDocument);

  const challenged = useChallenged();

  const { me } = useAccount();

  /*
   * A new form each time the dialog closes, so a sent message is not what
   * opens next, and when the account changes, so it starts with that address.
   */
  const [opened, setOpened] = useState(0);

  const send = useCallback(
    ({ Email, Message }: ContactFormValues) =>
      challenged(() =>
        contact({
          variables: {
            Contact: { Email: Email as ContactInput['Email'], Message },
          },
        })
      ),
    [challenged, contact]
  );

  return (
    <Dialog
      id={CONTACT_ID}
      onClose={() => setOpened((count) => count + 1)}
      title={COPY.title}
    >
      <ContactForm
        email={me?.Email ?? undefined}
        key={`${opened} ${me?.Email}`}
        onSubmit={send}
      />
    </Dialog>
  );
};

export { Contact };
