import React from 'react';

// Components
import { Form, Layout } from 'design/components';

// Partials
import { Field } from './field';
import { Swatches } from './swatches';

// Context
import { useMaker } from '@/views/experiments/swatch/maker/context';

// Hooks
import { usePick } from './use-pick';

// Constants
import { FORM } from '@/views/experiments/swatch/maker/constants';

const Pick: React.FunctionComponent = () => {
  const { form, submit } = usePick();
  const { busy } = useMaker();

  return (
    <Form {...form} id={FORM} onSubmit={submit}>
      <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
        <fieldset className='kicl-inline-size-full' disabled={busy}>
          <Field />
          <Swatches />
        </fieldset>
      </Layout>
    </Form>
  );
};

export { Pick };
