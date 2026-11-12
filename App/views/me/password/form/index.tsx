import React from 'react';

// Components
import { Form, FormMessage } from 'design/components';

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
      <FormMessage name='root' />
      <Send />
    </Form>
  );
};

export { PasswordForm };
