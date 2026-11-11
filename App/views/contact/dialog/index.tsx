import React from 'react';

// Components
import { Dialog as Origin } from 'design/components';

// Hooks
import { useDialog } from './use-dialog';

// Partials
import { Form } from './form';
import { Title } from './title';

// Constants
import { CONTACT_ID } from '@/views/constants';

/** The form the site offers in place of an email address. */
const Dialog: React.FunctionComponent = () => {
  const node = useDialog();

  return (
    <Origin header={<Title />} id={CONTACT_ID} ref={node}>
      <Form />
    </Origin>
  );
};

export { Dialog };
