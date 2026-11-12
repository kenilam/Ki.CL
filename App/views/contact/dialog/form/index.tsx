import React from 'react';

// Views
import { useAccount } from '@/views/account/use-account';

// Partials
import { Contents } from './contents';

const Form: React.FunctionComponent = () => {
  const { me } = useAccount();

  return (
    // The dialog takes its contents out when it closes, so each opening is a
    // new form. The key starts one over when the account changes while open.
    <Contents key={me?.email} />
  );
};

export { Form };
