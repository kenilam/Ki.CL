import React from 'react';

// Components
import {
  Dialog as Origin,
  Form,
  Layout,
  Spinner,
  useFormState,
} from 'design/components';

// Context
import { useDeleteContext } from '@/views/me/profile/delete/context';

// Partials
import { Actions } from './actions';
import { Message } from './message';
import { Notice } from './notice';
import { Password } from './password';
import { Title } from './title';

// Constants
import {
  DELETE_ID,
  MESSAGE_ID,
  NOTICE_ID,
  TITLE_ID,
} from '@/views/me/profile/constants';

const Dialog: React.FunctionComponent = () => {
  const { form, onSubmit } = useDeleteContext();
  const { isSubmitting } = useFormState({ control: form.control });

  return (
    <Origin
      aria-describedby={`${NOTICE_ID} ${NOTICE_ID}-list ${MESSAGE_ID}`}
      aria-labelledby={TITLE_ID}
      closable={isSubmitting ? false : 'keyboard'}
      id={DELETE_ID}
      role='alertdialog'
    >
      <Layout
        alignContent='center'
        alignItems='center'
        justifyContent='center'
        justifyItems='center'
      >
        <section className='kicl-padding-block-end-wide'>
          <Title />
          <Notice />
          <Message />
          <Spinner in={isSubmitting} position='inline' />
          <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
            <Password />
            <Actions />
          </Form>
        </section>
      </Layout>
    </Origin>
  );
};

export { Dialog };
