import React from 'react';

// Components
import { Form as Origin, FormMessage, Layout } from 'design/components';

// Hooks
import { useSignIn } from './use-sign-in';

// Partials
import { Email } from './email';
import { Password } from './password';
import { Submit } from './submit';

const Form: React.FunctionComponent = () => {
  const { form, onSubmit } = useSignIn();

  return (
    <Layout
      alignContent='start'
      alignItems='start'
      autoFlow='row'
      justifyContent='stretch'
      justifyItems='stretch'
    >
      <Origin {...form} onSubmit={form.handleSubmit(onSubmit)}>
        <Email />
        <Password />
        <FormMessage name='root' />
        <Submit />
      </Origin>
    </Layout>
  );
};

export { Form };
