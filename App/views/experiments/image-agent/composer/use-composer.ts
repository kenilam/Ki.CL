import { useCallback, useEffect } from 'react';

// Libraries
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm, useWatch } from 'react-hook-form';

// Spec
import type { Sender } from './spec';

// Schema
import { ComposerSchema, type ComposerValues } from './schema';

type Options = Pick<Sender, 'error' | 'send'> & {
  /** Told what is in the field on every change. */
  onText?: (text: string) => void;
};

/**
 * The composer's form: the text and the send. Any error, a quota refusal
 * included, shows under the field.
 */
function useComposer({ error, onText, send }: Options) {
  const form = useForm<ComposerValues>({
    defaultValues: { text: '' },
    resolver: valibotResolver(ComposerSchema),
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
