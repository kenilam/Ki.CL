import React from 'react';

import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm } from 'react-hook-form';

import {
  Kicl_MeDocument,
  Kicl_UpdateMeDocument,
  useMutation,
  type Kicl_MeQuery,
} from 'api/provider';

// Components
import { Button, CardContent, Form as Origin, Layout } from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

// Constants
import { COPY } from '@/views/me/profile/constants';

// Partials
import { Name } from './name';
import { Status } from './status';

// Schema
import { ProfileSchema, type ProfileValues } from './schema';

type Props = {
  me: NonNullable<Kicl_MeQuery['Me']>;
};

const Form: React.FunctionComponent<Props> = ({ me }) => {
  const form = useForm<ProfileValues>({
    defaultValues: {
      FirstName: me.FirstName ?? '',
      LastName: me.LastName ?? '',
    },
    resolver: valibotResolver(ProfileSchema),
  });

  const [updateMe, { loading }] = useMutation(Kicl_UpdateMeDocument);

  const onSubmit = async (names: ProfileValues) => {
    try {
      await updateMe({
        // The header reads the same `Me`, so it follows.
        awaitRefetchQueries: true,
        refetchQueries: [Kicl_MeDocument],
        variables: { UpdateMe: names },
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
      <Layout autoFlow='row' gap='narrower'>
        <CardContent>
          <Name />
          <Status />
        </CardContent>
      </Layout>
      <Layout autoFlow='column' justifyContent='center' gap='narrow'>
        <footer className='kicl-padding-block'>
          <Button
            disabled={loading}
            size='small'
            type='reset'
            variant='secondary'
          >
            {COPY.reset}
          </Button>
          <Button
            after={
              loading && (
                <Ri.RiLoader4Line aria-hidden className='is-revolving' />
              )
            }
            disabled={loading}
            size='small'
            type='submit'
            level='confirm'
          >
            {COPY.save}
          </Button>
        </footer>
      </Layout>
    </Origin>
  );
};

export { Form };
