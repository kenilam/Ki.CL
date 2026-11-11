import React from 'react';

// Components
import {
  FileInput,
  Form,
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from 'design/components';

// Partials
import { Allowance } from '@/views/experiments/kinetic-light/allowance';
import { Generated } from './generated';
import { Status } from './status';
import { Submit } from './submit';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useGenerateContext } from '@/views/experiments/kinetic-light/context';

// Constants
import { ACCEPT } from '@/views/experiments/kinetic-light/constants';

const Generate: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');
  const { busy, cooling, form, generated, spent, submit } =
    useGenerateContext();

  if (generated) {
    return <Generated />;
  }

  return (
    <Form {...form} onSubmit={submit}>
      <Allowance />
      <FormField
        control={form.control}
        name='file'
        render={({ field: { name, onBlur, onChange, ref } }) => (
          <FormItem>
            <FormLabel>{t('label', { context: 'file' })}</FormLabel>
            <FormControl>
              <FileInput
                accept={ACCEPT}
                after={<Submit />}
                disabled={busy || spent || cooling}
                inline
                name={name}
                onBlur={onBlur}
                onChange={(event) => onChange(event.target.files?.[0])}
                ref={ref}
              />
            </FormControl>
            <FormDescription role='status'>
              <Status />
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
};

export { Generate };
