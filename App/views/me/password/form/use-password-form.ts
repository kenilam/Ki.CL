import { useMemo } from 'react';

// Components
import { valibotResolver, useForm } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { usePasswordChangeContext } from '@/views/context';

// Schema
import {
  passwordSchema,
  type PasswordValues,
} from '@/views/me/password/schema';

/** Sends the link. A rejection is shown under the field. */
const usePasswordForm = () => {
  const { t } = useTranslation('me');
  const { start } = usePasswordChangeContext();
  const schema = useMemo(() => passwordSchema(t), [t]);

  const form = useForm<PasswordValues>({
    defaultValues: { currentPassword: '', password: '' },
    resolver: valibotResolver(schema),
  });

  const submit = async (values: PasswordValues) => {
    try {
      await start(values);
    } catch (error) {
      form.setError('root', {
        message: error instanceof Error ? error.message : undefined,
      });
    }
  };

  return { form, submit };
};

export { usePasswordForm };
