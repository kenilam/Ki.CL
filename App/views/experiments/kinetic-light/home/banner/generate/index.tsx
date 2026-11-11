import React, { useEffect } from 'react';

// Components
import { Form, Layout } from 'design/components';

// Routes
import { useNavigate } from 'design/router';

// Partials
import { Cooling } from './cooling';
import { Field } from './field';
import { Status } from './status';
import { Submit } from './submit';

// Context
import { useGenerateContext } from '@/views/experiments/kinetic-light/context';

// Constants
import { toPath } from '@/views/experiments/kinetic-light/constants';

const Generate: React.FunctionComponent = () => {
  const { busy, clear, cooling, form, generated, spent, submit } = useGenerateContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!generated) {
      return;
    }

    navigate(toPath(generated.id));
    clear();
  }, [clear, generated, navigate]);

  if (spent && !busy) {
    return null;
  }

  return (
    <Form {...form} className='kicl-inline-size-columns-5' onSubmit={submit}>
      <Layout
        alignContent='start'
        alignItems='start'
        autoFlow='row'
        gap='narrow'
      >
        <fieldset className='kicl-inline-size-full' disabled={busy || cooling}>
          <Field />
          <Submit />
          <Status />
          <Cooling />
        </fieldset>
      </Layout>
    </Form>
  );
};

export { Generate };
