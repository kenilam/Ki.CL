// Components
import { useForm } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useSend } from './use-send';

// Views
import { useAccount } from '@/views/account/use-account';

// Spec
import type { Values } from './spec';

/** A rejection's message shows over the button, and the fields keep what was typed. */
const useContact = () => {
  const { t } = useTranslation();
  const { me } = useAccount();
  const send = useSend();

  const form = useForm<Values>({
    defaultValues: { email: me?.email ?? '', message: '' },
  });

  const submit = form.handleSubmit(async (values) => {
    try {
      await send(values);
    } catch (error) {
      form.setError('root', {
        message:
          (error instanceof Error && error.message) ||
          t('error', { context: 'not_sent' }),
      });
    }
  });

  return { form, submit };
};

export { useContact };
