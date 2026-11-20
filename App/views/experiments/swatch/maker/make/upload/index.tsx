import React from 'react';

// Components
import { Form, Layout } from 'design/components';

// Partials
import { Field } from './field';
import { Found } from './found';

// Context
import { useMaker } from '@/views/experiments/swatch/maker/context';

// Hooks
import { useUpload } from './use-upload';

// Constants
import { FORM } from '@/views/experiments/swatch/maker/constants';

const Upload: React.FunctionComponent = () => {
  const { form, submit } = useUpload();
  const { busy } = useMaker();

  return (
    <Form {...form} id={FORM} onSubmit={submit}>
      <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
        <fieldset className='kicl-inline-size-full' disabled={busy}>
          <Field />
          <Found />
        </fieldset>
      </Layout>
    </Form>
  );
};

export { Upload };
