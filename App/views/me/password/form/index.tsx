import React from 'react';

// Components
import { Form } from 'design/components';

// Views
import { RootError } from '@/views/root-error';

// Hooks
import { usePasswordForm } from './use-password-form';

// Partials
import { CurrentPassword } from './current-password';
import { NewPassword } from './new-password';
import { Send } from './send';

const PasswordForm: React.FunctionComponent = () => {
  const { form, submit } = usePasswordForm();

  return (
    <Form {...form} onSubmit={form.handleSubmit(submit)}>
      <CurrentPassword />
      <NewPassword />
      <RootError />
      <Send />
    </Form>
  );
};

export { PasswordForm };
