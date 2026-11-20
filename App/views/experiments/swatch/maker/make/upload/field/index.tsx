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
  useFormContext,
} from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { ACCEPT, MAX_FILE_SIZE } from '@/views/experiments/swatch/constants';
import type { UploadValues } from '@/views/experiments/swatch/maker/make/upload/schema';

const Field: React.FunctionComponent = () => {
  const { t } = useTranslation('swatch');
  const { control } = useFormContext<UploadValues>();

  return (
    <FormField
      control={control}
      name='file'
      render={({ field: { name, onBlur, onChange, ref } }) => (
        <FormItem>
          <FormLabel>{t('label', { context: 'picture' })}</FormLabel>
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
            {t('hint', { context: 'picture', size: MAX_FILE_SIZE })}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { Field };
