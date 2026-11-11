import React from 'react';

// Components
import { Form } from 'design/components';

// Partials
import { Field } from './field';

// Context
import { Provider, useComposerContext } from './context';

/** The message field. */
const Composer: React.FunctionComponent = () => {
  const { form, submit } = useComposerContext();

  return (
    <Form {...form} className='kicl-inline-size-full' onSubmit={submit}>
      <Field />
    </Form>
  );
};

export { Composer, Provider, useComposerContext };
