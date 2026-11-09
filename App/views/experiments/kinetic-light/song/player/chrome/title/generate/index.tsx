import React, { useEffect, useRef } from 'react';

// Libraries
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// Icons
import * as Bs from 'react-icons/bs';

// Components
import {
  AnimatedText,
  Animation,
  FileInput,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  InputGroupButton,
  Text,
} from 'design/components';

// Partials
import { Allowance } from '@/views/experiments/kinetic-light/allowance';

// Context
import { useKineticLightContext } from '@/views/experiments/kinetic-light/context';

// Styles
import './styles.scss';

// Constants
import {
  ACCEPT,
  CLASS_NAME as VIEW,
  MAX_FILE_SIZE,
} from '@/views/experiments/kinetic-light/constants';

const CLASS_NAME = `${VIEW}__player__generate`;

const Generate: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');
  const {
    generate: { busy, cooling, form, seconds, spent, status, submit },
  } = useKineticLightContext();
  const blocked = busy || spent || cooling;
  const generateButton = useRef<HTMLButtonElement>(null);
  const file = useWatch({ control: form.control, name: 'file' });

  let message = status ?? t('action', { context: 'generating' });
  let key = message;

  if (!busy && cooling) {
    message = t('status', { context: 'cooling', count: seconds });
    key = 'cooling';
  }

  useEffect(() => {
    if (!file) {
      return;
    }

    generateButton.current?.focus();
  }, [file]);

  return (
    <Form {...form} className={CLASS_NAME} onSubmit={submit}>
      <FormField
        control={form.control}
        name='file'
        render={({ field: { name, onBlur, onChange, ref } }) => (
          <Animation in={!blocked}>
            <FormItem>
              <FormControl>
                <FileInput
                  accept={ACCEPT}
                  after={
                    <InputGroupButton
                      before={<Bs.BsStars aria-hidden />}
                      disabled={!file}
                      ref={generateButton}
                      type='submit'
                      variant='ghost'
                    >
                      {t('action', { context: 'generate' })}
                    </InputGroupButton>
                  }
                  aria-label={t('label', { context: 'file' })}
                  inline
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
          </Animation>
        )}
      />
      {spent && !busy ? <Allowance /> : null}
      {busy || (cooling && !spent) ? (
        <Animation delay='var(--kicl-transition-duration-fast)'>
          <Text is='p' role='status' variant='secondary'>
            <AnimatedText is='span' key={key} split='word'>
              {message}
            </AnimatedText>
          </Text>
        </Animation>
      ) : null}
    </Form>
  );
};

export { Generate };
