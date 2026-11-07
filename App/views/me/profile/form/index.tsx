import React, { useMemo } from 'react';

import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Kicl_MeDocument,
  Kicl_UpdateMeDocument,
  useMutation,
  type Kicl_MeQuery,
} from 'api/provider';

// Components
import { Button, CardFooter, Form as Origin } from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

// Partials
import { Name } from './name';
import { Status } from './status';

// Schema
import { profileSchema, type ProfileValues } from './schema';

type Props = {
  me: NonNullable<Kicl_MeQuery['me']>;
};

const Form: React.FunctionComponent<Props> = ({ me }) => {
  const translations = {
    common: useTranslation(),
    me: useTranslation('me'),
  };
  const schema = useMemo(
    () => profileSchema(translations.me.t),
    [translations.me.t]
  );

  const form = useForm<ProfileValues>({
    defaultValues: {
      firstName: me.firstName ?? '',
      lastName: me.lastName ?? '',
    },
    resolver: valibotResolver(schema),
  });

  const [updateMe, { loading }] = useMutation(Kicl_UpdateMeDocument);

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

  return (
    <Origin {...form} onSubmit={form.handleSubmit(onSubmit)}>
      <Name />
      <Status />
      <CardFooter justifyContent='center'>
        <Button
          disabled={loading}
          size='small'
          type='reset'
          variant='secondary'
        >
          {translations.common.t('action', { context: 'reset' })}
        </Button>
        <Button
          after={
            loading && <Ri.RiLoader4Line aria-hidden className='is-revolving' />
          }
          disabled={loading}
          size='small'
          type='submit'
          level='confirm'
        >
          {translations.common.t('action', { context: 'save' })}
        </Button>
      </CardFooter>
    </Origin>
  );
};

export { Form };
