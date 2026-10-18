import React from 'react';

// Libraries
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// Icons
import * as Ri from 'react-icons/ri';

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
} from 'design/components';

// Schema
import { MAX_LENGTH, type ComposerValues } from './schema';

// Constants
import { CLASS_NAME } from './constants';

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
  const { t } = useTranslation('image-agent');
  const { t: common } = useTranslation();
  const { control } = useFormContext<ComposerValues>();
  const placeholder = t('placeholder');

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
                aria-label={placeholder}
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
                placeholder={placeholder}
                rows={1}
              />
            </FormControl>
            <InputGroupAddon>
              <InputGroupButton
                aria-label={common('action', { context: 'send' })}
                disabled={disabled}
                type='submit'
                variant='ghost'
              >
                {sending ? (
                  <Ri.RiLoader4Line aria-hidden className='is-revolving' />
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
