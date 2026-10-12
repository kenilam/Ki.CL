import { useCallback, useEffect, useMemo } from 'react';

// Libraries
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// Spec
import type { Sender } from './spec';

// Schema
import { composerSchema, type ComposerValues } from './schema';

type Options = Pick<Sender, 'error' | 'send'> & {
  /** Told what is in the field on every change. */
  onText?: (text: string) => void;
};

/**
 * The composer's form: the text and the send. Any error, a quota refusal
 * included, shows under the field.
 */
function useComposer({ error, onText, send }: Options) {
  const { t } = useTranslation('image-agent');
  const schema = useMemo(() => composerSchema(t), [t]);

  const form = useForm<ComposerValues>({
    defaultValues: { text: '' },
    resolver: valibotResolver(schema),
  });

  const text = useWatch({ control: form.control, name: 'text' });

  useEffect(() => {
    onText?.(text ?? '');
  }, [onText, text]);

  useEffect(() => {
    if (error?.message) {
      form.setError('text', { message: error.message });
    }
  }, [error, form]);

  const onSubmit = useCallback(
    async (values: ComposerValues) => {
      if (await send(values.text)) {
        form.reset();
      }
    },
    [form, send]
  );

  return { form, submit: form.handleSubmit(onSubmit) };
}

export { useComposer };
