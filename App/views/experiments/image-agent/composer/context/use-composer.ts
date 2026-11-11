import { useCallback, useEffect, useMemo } from 'react';

// Schema
import { composerSchema, type ComposerValues } from '@/views/experiments/image-agent/composer/schema';

// Components
import { valibotResolver, useForm } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

type Options = {
  error: Error | undefined;
  /** Resolves to whether the agent accepted the message. */
  send: (text: string) => Promise<boolean>;
};

/**
 * The composer's form: the text and the send. Any error, a quota refusal
 * included, shows under the field.
 */
function useComposer({ error, send }: Options) {
  const { t } = useTranslation('image-agent');
  const schema = useMemo(() => composerSchema(t), [t]);

  const form = useForm<ComposerValues>({
    defaultValues: { text: '' },
    resolver: valibotResolver(schema),
  });

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
