import React from 'react';

// Components
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  InputGroup,
  InputGroupTextarea,
} from 'design/components';

// Partials
import { Send } from './send';

// Hooks
import { useTranslation } from 'design/hooks';
import { useField } from './use-field';

// Schema
import { MAX_LENGTH } from '@/views/experiments/image-agent/composer/schema';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/image-agent/constants';

const CLASS_NAME = `${VIEW}__composer__field`;

/** Enter sends, Shift+Enter adds a line. */
const Field: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');
  const { control, disabled, submit } = useField();

  return (
    <FormField
      control={control}
      name='text'
      render={({ field }) => (
        <FormItem>
          <InputGroup disabled={disabled}>
            <FormControl>
              <InputGroupTextarea
                {...field}
                aria-label={t('label', { context: 'message' })}
                className={CLASS_NAME}
                autoComplete='off'
                maxLength={MAX_LENGTH}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    void submit();
                  }
                }}
                placeholder={t('placeholder')}
                rows={1}
              />
            </FormControl>
            <Send />
          </InputGroup>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { Field };
