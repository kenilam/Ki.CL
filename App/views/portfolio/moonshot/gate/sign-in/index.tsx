import React, { useCallback, useMemo } from 'react';

// Libraries
import classNames from 'classnames';

import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Kicl_SignInDocument,
  useMutation,
  type SignInInput,
} from 'api/provider';

// Components
import {
  Animation,
  Button,
  Card,
  CardFooter,
  Form,
  Frame,
  Layout,
} from 'design/components';

// Widgets
import { Background } from 'design/widgets';

// Icons
import * as Bs from 'react-icons/bs';

// Views
import { CONTENT_DELAY, FRAME_DELAY } from '@/views/constants';
import { RootError } from '@/views/root-error';

// Partials
import { Email } from './email';
import { Header } from './header';
import { Password } from './password';

// Schema
import { signInSchema, type SignInValues } from './schema';

type Props = React.ComponentProps<typeof Header> & {
  onSignedIn: () => void;
};

const SignIn: React.FunctionComponent<Props> = ({ denied, onSignedIn }) => {
  const translations = {
    common: useTranslation(),
    portfolio: useTranslation('portfolio'),
  };
  const schema = useMemo(
    () => signInSchema(translations.portfolio.t),
    [translations.portfolio.t]
  );

  const form = useForm<SignInValues>({
    defaultValues: { email: '', password: '' },
    resolver: valibotResolver(schema),
  });

  const [signIn, { loading }] = useMutation(Kicl_SignInDocument);

  const onSubmit = useCallback(
    async (values: SignInValues) => {
      try {
        const { data } = await signIn({
          variables: {
            signIn: {
              email: values.email as SignInInput['email'],
              password: values.password,
            },
          },
        });

        if (data?.signIn) {
          onSignedIn();
        }
      } catch (error) {
        form.setError('root', {
          message: error instanceof Error ? error.message : undefined,
        });
      }
    },
    [form, onSignedIn, signIn]
  );

  return (
    <Layout
      alignContent='center'
      alignItems='center'
      autoFlow='row'
      justifyContent='center'
      justifyItems='center'
    >
      {/* Grows, with room above and below the card, for a window shorter than the form. */}
      <Frame delay={FRAME_DELAY} grow>
        <section
          className={classNames(
            'kicl-padding-block-frame',
            'kicl-position-relative'
          )}
        >
          <Animation delay={CONTENT_DELAY}>
            <Background />
          </Animation>
          <Card is='section' size='max' variant='secondary'>
            <Header denied={denied} />
            <Layout
              alignContent='start'
              alignItems='start'
              autoFlow='row'
              justifyContent='stretch'
              justifyItems='stretch'
            >
              <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
                <Email />
                <Password />
                <RootError />
                <CardFooter justifyContent='center'>
                  <Button
                    after={
                      loading && (
                        <Bs.BsArrowClockwise
                          aria-hidden
                          className='is-revolving'
                        />
                      )
                    }
                    disabled={loading}
                    type='submit'
                    size='small'
                  >
                    {translations.common.t('action', { context: 'sign_in' })}
                  </Button>
                </CardFooter>
              </Form>
            </Layout>
          </Card>
        </section>
      </Frame>
    </Layout>
  );
};

export { SignIn };
