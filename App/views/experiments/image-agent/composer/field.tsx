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
  const translations = {
    common: useTranslation(),
    imageAgent: useTranslation('image-agent'),
  };
  const { control } = useFormContext<ComposerValues>();

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
                aria-label={translations.imageAgent.t('label', {
                  context: 'message',
                })}
                className={`${CLASS_NAME}__field`}
                autoComplete='off'
                maxLength={MAX_LENGTH}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    onEnter();
                  }
                }}
                placeholder={translations.imageAgent.t('placeholder')}
                rows={1}
              />
            </FormControl>
            <InputGroupButton
              aria-label={translations.common.t('action', { context: 'send' })}
              type='submit'
              variant='ghost'
            >
              {sending ? (
                <Ri.RiLoader4Line aria-hidden className='is-revolving' />
              ) : (
                <Ri.RiCornerRightUpLine
                  aria-hidden
                  className='kicl-rtl-mirror'
                />
              )}
            </InputGroupButton>
          </InputGroup>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { Field };
