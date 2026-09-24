import React from 'react';

// Libraries
import { useFormContext } from 'react-hook-form';

// Icons
import { Ri } from '@/icons';

// Components
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
  Spinner,
} from '@/components';

// Schema
import { MAX_LENGTH, type ComposerValues } from './schema';

// Constants
import { CLASS_NAME } from './constants';

const COPY = {
  placeholder: 'A red fox asleep under a birch, in winter light',
  send: 'Send',
};

type Props = {
  disabled: boolean;
  /** Enter sends, Shift+Enter adds a line. */
  onEnter: () => void;
  sending: boolean;
};

const Field: React.FunctionComponent<Props> = ({
  disabled,
  onEnter,
  sending,
}) => {
  const { control } = useFormContext<ComposerValues>();

  return (
    <FormField
      control={control}
      name='text'
      render={({ field }) => (
        <FormItem>
          <InputGroup>
            <FormControl>
              <InputGroupTextarea
                {...field}
                aria-label={COPY.placeholder}
                className={`${CLASS_NAME}__field`}
                autoComplete='off'
                disabled={disabled}
                maxLength={MAX_LENGTH}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    onEnter();
                  }
                }}
                placeholder={COPY.placeholder}
                rows={1}
              />
            </FormControl>
            <InputGroupAddon align='inline-end'>
              <InputGroupButton
                aria-label={COPY.send}
                disabled={disabled}
                type='submit'
                variant='ghost'
              >
                {sending ? (
                  <Spinner in position='inline' size='smaller' />
                ) : (
                  <Ri.RiCornerRightUpLine aria-hidden />
                )}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { Field };
