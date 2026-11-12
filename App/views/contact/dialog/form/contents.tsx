import React from 'react';

// Components
import { Form, FormMessage, Status } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useContact } from './use-contact';

// Partials
import { Email } from './email';
import { Message } from './message';
import { Send } from './send';

const Contents: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { form, submit } = useContact();

  if (form.formState.isSubmitSuccessful) {
    return (
      <Status
        level='info'
        message={t('sent_to', { email: form.getValues('email') })}
        title={t('message_sent')}
      />
    );
  }

  return (
    <Form {...form} onSubmit={submit}>
      <Email />
      <Message />
      <FormMessage name='root' />
      <Send />
    </Form>
  );
};

export { Contents };
