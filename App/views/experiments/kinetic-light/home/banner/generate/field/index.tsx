import React from 'react';

// Components
import {
  FileInput,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useGenerateContext } from '@/views/experiments/kinetic-light/context';

// Constants
import {
  ACCEPT,
  MAX_FILE_SIZE,
} from '@/views/experiments/kinetic-light/constants';

const Field: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');
  const { form } = useGenerateContext();

  return (
    <FormField
      control={form.control}
      name='file'
      render={({ field: { name, onBlur, onChange, ref } }) => (
        <FormItem>
          <FormLabel>{t('label', { context: 'file' })}</FormLabel>
          <FormControl>
            <FileInput
              accept={ACCEPT}
              name={name}
              onBlur={onBlur}
              onChange={(event) => onChange(event.target.files?.[0])}
              ref={ref}
            />
          </FormControl>
          <FormDescription>
            {t('hint', { context: 'file', size: MAX_FILE_SIZE })}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { Field };
