import React from 'react';

import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm } from 'react-hook-form';

// Components
import {
  Button,
  CardContent,
  CardFooter,
  Form,
  Layout,
} from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

// Views
import { RootError } from '@/views/root-error';

// Partials
import { Fields } from './fields';

// Constants
import { COPY } from './constants';

// Schema
import { PasswordSchema, type PasswordValues } from './schema';

type Props = {
  /** Sends the link. A rejection is shown under the field. */
  onSubmit: (values: PasswordValues) => Promise<void>;
};

const PasswordForm: React.FunctionComponent<Props> = ({ onSubmit }) => {
  const form = useForm<PasswordValues>({
    defaultValues: { CurrentPassword: '', Password: '' },
    resolver: valibotResolver(PasswordSchema),
  });

  const { isSubmitting } = form.formState;

  const submit = async (values: PasswordValues) => {
    try {
      await onSubmit(values);
    } catch (error) {
      form.setError('root', {
        message: error instanceof Error ? error.message : undefined,
      });
    }
  };

  return (
    <Form {...form} onSubmit={form.handleSubmit(submit)}>
      <Layout gap='narrow'>
        <CardContent>
          <Fields />
          <RootError />
        </CardContent>
      </Layout>
      <CardFooter>
        <Button disabled={isSubmitting} size='small' type='submit'>
          {COPY.send}
          {isSubmitting ? (
            <Ri.RiLoader4Line aria-hidden className='is-revolving' />
          ) : null}
        </Button>
      </CardFooter>
    </Form>
  );
};

export { PasswordForm };
