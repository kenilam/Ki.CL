import React, { useEffect, useRef } from 'react';

// Libraries
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// Icons
import * as Bs from 'react-icons/bs';

// Components
import {
  AnimatedText,
  FileInput,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  HyperLink,
  InputGroupButton,
} from 'design/components';

// Partials
import { Allowance } from '@/views/experiments/kinetic-light/allowance';

// Context
import { useKineticLightContext } from '@/views/experiments/kinetic-light/context';

// Constants
import {
  ACCEPT,
  MAX_FILE_SIZE,
  toPath,
} from '@/views/experiments/kinetic-light/constants';

const Generate: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');
  const {
    generate: {
      busy,
      clear,
      cooling,
      form,
      generated,
      seconds,
      spent,
      status,
      submit,
    },
  } = useKineticLightContext();
  const blocked = busy || spent || cooling;
  const generateButton = useRef<HTMLButtonElement>(null);
  const file = useWatch({ control: form.control, name: 'file' });

  useEffect(() => {
    if (!file) {
      return;
    }

    generateButton.current?.focus({ focusVisible: true });
  }, [file]);

  if (generated) {
    return (
      <HyperLink
        after={<Bs.BsArrowRight aria-hidden />}
        before={<Bs.BsMusicNoteBeamed aria-hidden />}
        className='kicl-inline-size-full'
        frames='max-content--auto--max-content'
        justifyContent='stretch'
        lookLikeButton
        onClick={clear}
        to={toPath(generated.id)}
        variant='secondary'
      >
        <span className='kicl-text-truncate' title={generated.title}>
          {generated.title}
        </span>
      </HyperLink>
    );
  }

  let message = t('hint', { context: 'file', size: MAX_FILE_SIZE });
  let key = 'hint';

  if (busy) {
    message = status ?? t('action', { context: 'generating' });
    key = message;
  }

  if (!busy && cooling && !spent) {
    message = t('status', { context: 'cooling', count: seconds });
    key = 'cooling';
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
                after={
                  <InputGroupButton
                    aria-label={t('action', { context: 'generate' })}
                    block
                    disabled={!file || blocked}
                    ref={generateButton}
                    type='submit'
                    variant='primary'
                  >
                    {busy ? (
                      <Bs.BsArrowClockwise
                        aria-hidden
                        className='is-revolving'
                      />
                    ) : (
                      <Bs.BsStars aria-hidden />
                    )}
                  </InputGroupButton>
                }
                disabled={blocked}
                inline
                name={name}
                onBlur={onBlur}
                onChange={(event) => onChange(event.target.files?.[0])}
                ref={ref}
              />
            </FormControl>
            <FormDescription role='status'>
              <AnimatedText is='span' key={key} split='word'>
                {message}
              </AnimatedText>
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
};

export { Generate };
