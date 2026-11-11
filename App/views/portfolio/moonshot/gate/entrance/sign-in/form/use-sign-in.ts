import { useCallback, useMemo } from 'react';

import {
  Kicl_MeDocument,
  Kicl_SignInDocument,
  useMutation,
  type SignInInput,
} from 'api/provider';

// Components
import { valibotResolver, useForm } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Schema
import { signInSchema, type SignInValues } from './schema';

const useSignIn = () => {
  const { t } = useTranslation('portfolio');
  const schema = useMemo(() => signInSchema(t), [t]);

  const form = useForm<SignInValues>({
    defaultValues: { email: '', password: '' },
    resolver: valibotResolver(schema),
  });

  const [signIn] = useMutation(Kicl_SignInDocument, {
    refetchQueries: [Kicl_MeDocument],
  });

  const onSubmit = useCallback(
    async (values: SignInValues) => {
      try {
        await signIn({
          variables: {
            signIn: {
              email: values.email as SignInInput['email'],
              password: values.password,
            },
          },
        });
      } catch (error) {
        form.setError('root', {
          message: error instanceof Error ? error.message : undefined,
        });
      }
    },
    [form, signIn]
  );

  return { form, onSubmit };
};

export { useSignIn };
