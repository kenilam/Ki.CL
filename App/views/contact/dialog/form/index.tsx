import React from 'react';

// Widgets
import { ContactForm } from 'design/widgets';

// Views
import { useAccount } from '@/views/account/use-account';

// Hooks
import { useSend } from './use-send';

const Form: React.FunctionComponent = () => {
  const { me } = useAccount();
  const send = useSend();

  return (
    // The dialog takes its contents out when it closes, so each opening is a
    // new form. The key starts one over when the account changes while open.
    <ContactForm
      email={me?.email ?? undefined}
      key={me?.email}
      onSubmit={send}
    />
  );
};

export { Form };
