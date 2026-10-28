import React, { useMemo } from 'react';

import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// Components
import { Button, CardFooter, Form } from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

// Views
import { RootError } from '@/views/root-error';

// Partials
import { Fields } from './fields';

// Schema
import { passwordSchema, type PasswordValues } from './schema';

type Props = {
  /** Sends the link. A rejection is shown under the field. */
  onSubmit: (values: PasswordValues) => Promise<void>;
};

const PasswordForm: React.FunctionComponent<Props> = ({ onSubmit }) => {
  const { t } = useTranslation('me');
  const schema = useMemo(() => passwordSchema(t), [t]);

  const form = useForm<PasswordValues>({
    defaultValues: { CurrentPassword: '', Password: '' },
    resolver: valibotResolver(schema),
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
      <Fields />
      <RootError />
      <CardFooter justifyContent='center'>
        <Button
          after={
            isSubmitting && (
              <Ri.RiLoader4Line aria-hidden className='is-revolving' />
            )
          }
          disabled={isSubmitting}
          size='small'
          type='submit'
        >
          {t('action', { context: 'send' })}
        </Button>
      </CardFooter>
    </Form>
  );
};

export { PasswordForm };
