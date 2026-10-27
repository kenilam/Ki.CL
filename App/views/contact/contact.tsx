import React, { useCallback, useEffect, useRef } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

import {
  Kicl_ContactDocument,
  useMutation,
  type ContactInput,
} from 'api/provider';

// Components
import { Dialog, Heading } from 'design/components';

// Routers
import { useLocation } from 'design/router';

// Widgets
import { ContactForm, type ContactFormValues } from 'design/widgets';

// Session
import { useChallenged } from '@/session';

// Views
import { useAccount } from '@/views/account/use-account';

// Constants
import { CONTACT_ID } from './constants';

/**
 * The form the site offers in place of an email address. The API sends only
 * for a session that passed the Turnstile check, so a session that has not is
 * checked first and the message sent again.
 */
const Contact: React.FunctionComponent = () => {
  const [contact] = useMutation(Kicl_ContactDocument);

  const challenged = useChallenged();

  const { me } = useAccount();

  const { t } = useTranslation();

  const { key } = useLocation();

  const node = useRef<HTMLDialogElement>(null);

  /*
   * Opened by a command from any page, so it outlives the route it was opened
   * on. It closes on every navigation, the back button included, as the
   * mobile navigation does.
   */
  useEffect(() => {
    node.current?.close();
  }, [key]);

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
      header={
        <Heading dense is='h2' lookLike='h4'>
          {t('send_message')}
        </Heading>
      }
      ref={node}
    >
      {/*
        The dialog takes its contents out when it closes, so each opening is a
        new form. The key starts one over when the account changes while open.
      */}
      <ContactForm
        email={me?.Email ?? undefined}
        key={me?.Email}
        onSubmit={send}
      />
    </Dialog>
  );
};

export { Contact };
