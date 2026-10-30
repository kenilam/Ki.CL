import React, { useId, useMemo } from 'react';

import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Kicl_DeleteMeDocument, useMutation } from 'api/provider';

// Components
import {
  Animation,
  Button,
  Dialog,
  Form,
  Heading,
  Layout,
  Spinner,
  Text,
} from 'design/components';

// Session
import { useEnded } from '@/session';

// Constants
import { DELETE_ID } from '@/views/me/profile/constants';

// Partials
import { Actions } from './actions';
import { Notice } from './notice';
import { Password } from './password';

// Schema
import { deleteSchema, type DeleteValues } from './schema';

/**
 * Deletes the account after the password is given again. The page then
 * finds no one signed in and sends the visitor home, which takes this with it.
 */
const Delete: React.FunctionComponent = () => {
  const { t } = useTranslation('me');
  const schema = useMemo(() => deleteSchema(t), [t]);

  const ended = useEnded();

  const titleId = useId();
  const messageId = useId();
  const noticeId = useId();

  const form = useForm<DeleteValues>({
    defaultValues: { CurrentPassword: '' },
    resolver: valibotResolver(schema),
  });

  const [deleteMe] = useMutation(Kicl_DeleteMeDocument);

  const pending = form.formState.isSubmitting;

  const onSubmit = async (values: DeleteValues) => {
    try {
      await deleteMe({ variables: { DeleteMe: values } });
      await ended();
    } catch (error) {
      form.setError('root', {
        message: error instanceof Error ? error.message : undefined,
      });
    }
  };

  return (
    <>
      <Button
        command='show-modal'
        commandfor={DELETE_ID}
        level='error'
        size='small'
        variant='secondary'
      >
        {t('action', { context: 'delete_account' })}
      </Button>

      <Dialog
        aria-describedby={`${noticeId} ${noticeId}-list ${messageId}`}
        aria-labelledby={titleId}
        closable={pending ? false : 'keyboard'}
        id={DELETE_ID}
        role='alertdialog'
      >
        <Layout
          alignContent='center'
          alignItems='center'
          justifyContent='center'
          justifyItems='center'
        >
          <section className='kicl-padding-block-end-wide'>
            <Animation property='slide-from-top'>
              <Heading dense id={titleId}>
                {t('title', { context: pending ? 'deleting' : 'delete' })}
              </Heading>
            </Animation>
            <Notice id={noticeId} />
            <Animation delay={300} property='slide-from-top'>
              <Text className='kicl-text-align-center' id={messageId} is='p'>
                {t('description', { context: 'delete' })}
              </Text>
            </Animation>
            <Spinner in={pending} position='inline' />
            <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
              <Password />
              <Actions />
            </Form>
          </section>
        </Layout>
      </Dialog>
    </>
  );
};

export { Delete };
