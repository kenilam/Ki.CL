import { useMemo } from 'react';

import {
  Kicl_MeDocument,
  Kicl_UpdateMeDocument,
  useMutation,
} from 'api/provider';

// Components
import { valibotResolver, useForm } from 'design/components';

// Views
import { useAccount } from '@/views/account/use-account';

// Hooks
import { useTranslation } from 'design/hooks';

// Schema
import { profileSchema, type ProfileValues } from './schema';

const useProfile = () => {
  const { t } = useTranslation('me');
  const { me } = useAccount();
  const schema = useMemo(() => profileSchema(t), [t]);

  const form = useForm<ProfileValues>({
    defaultValues: {
      firstName: me?.firstName ?? '',
      lastName: me?.lastName ?? '',
    },
    resolver: valibotResolver(schema),
  });

  const [updateMe] = useMutation(Kicl_UpdateMeDocument);

  const onSubmit = async (names: ProfileValues) => {
    try {
      await updateMe({
        // The header reads the same `Me`, so it follows.
        awaitRefetchQueries: true,
        refetchQueries: [Kicl_MeDocument],
        variables: { updateMe: names },
      });

      form.reset(names, { keepIsSubmitSuccessful: true });
    } catch (error) {
      form.setError('root', {
        message: error instanceof Error ? error.message : undefined,
      });
    }
  };

  return { form, onSubmit };
};

export { useProfile };
