import React, { useEffect, useRef } from 'react';

// Libraries
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// Icons
import * as Bs from 'react-icons/bs';

// Components
import {
  AnimatedText,
  Button,
  FileInput,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Layout,
  Text,
} from 'design/components';

// Routes
import { useNavigate } from 'design/router';

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
      running,
      seconds,
      spent,
      status,
      submit,
    },
  } = useKineticLightContext();
  const navigate = useNavigate();
  const generateButton = useRef<HTMLButtonElement>(null);
  const file = useWatch({ control: form.control, name: 'file' });

  useEffect(() => {
    if (!file) {
      return;
    }

    generateButton.current?.focus({ focusVisible: true });
  }, [file]);

  useEffect(() => {
    if (!generated) {
      return;
    }

    navigate(toPath(generated.id));
    clear();
  }, [clear, generated, navigate]);

  if (spent && !busy) {
    return null;
  }

  return (
    <Form {...form} className='kicl-inline-size-columns-5' onSubmit={submit}>
      <Layout
        alignContent='start'
        alignItems='start'
        autoFlow='row'
        gap='narrow'
      >
        <fieldset className='kicl-inline-size-full' disabled={busy || cooling}>
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
          <Button
            before={
              busy ? (
                <Bs.BsArrowClockwise aria-hidden className='is-revolving' />
              ) : (
                <Bs.BsStars aria-hidden />
              )
            }
            ref={generateButton}
            size='small'
            type='submit'
          >
            {t('action', { context: busy ? 'generating' : 'generate' })}
          </Button>
          {status ? (
            <Text is='p' role='status' variant='secondary'>
              <AnimatedText is='span' key={status} split='word'>
                {status}
              </AnimatedText>
            </Text>
          ) : null}
          {cooling && !running ? (
            <Text is='p' role='status' variant='secondary'>
              {t('status', { context: 'cooling', count: seconds })}
            </Text>
          ) : null}
        </fieldset>
      </Layout>
    </Form>
  );
};

export { Generate };
