import { useMemo } from 'react';

import { Kicl_DeleteMeDocument, useMutation } from 'api/provider';

// Session
import { useEnded } from '@/session';

// Schema
import { deleteSchema, type DeleteValues } from './schema';

// Components
import { valibotResolver, useForm } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

/**
 * Deletes the account after the password is given again. The page then
 * finds no one signed in and sends the visitor home, which takes this with it.
 */
const useDelete = () => {
  const { t } = useTranslation('me');
  const schema = useMemo(() => deleteSchema(t), [t]);

  const ended = useEnded();

  const form = useForm<DeleteValues>({
    defaultValues: { currentPassword: '' },
    resolver: valibotResolver(schema),
  });

  const [deleteMe] = useMutation(Kicl_DeleteMeDocument);

  const onSubmit = async (values: DeleteValues) => {
    try {
      await deleteMe({ variables: { deleteMe: values } });
      await ended();
    } catch (error) {
      form.setError('root', {
        message: error instanceof Error ? error.message : undefined,
      });
    }
  };

  return { form, onSubmit };
};

export { useDelete };
