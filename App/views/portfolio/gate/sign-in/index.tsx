import React, { useCallback, useEffect } from 'react';

// Libraries
import classNames from 'classnames';

import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm } from 'react-hook-form';

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
  CardContent,
  CardFooter,
  Form,
  Frame,
  Layout,
} from 'design/components';

// Widgets
import { Background } from 'design/widgets';

// Icons
import * as Ri from 'react-icons/ri';

// Views
import { CONTENT_DELAY, FRAME_DELAY } from '@/views/home/constants';
import { RootError } from '@/views/root-error';

// Partials
import { Email } from './email';
import { Header } from './header';
import { Password } from './password';

// Schema
import { SignInSchema, type SignInValues } from './schema';

type Props = React.ComponentProps<typeof Header> & {
  onSignedIn: () => void;
};

const SignIn: React.FunctionComponent<Props> = ({ denied, onSignedIn }) => {
  const form = useForm<SignInValues>({
    defaultValues: { Email: '', Password: '' },
    resolver: valibotResolver(SignInSchema),
  });

  const [signIn, { error, loading }] = useMutation(Kicl_SignInDocument);

  useEffect(() => {
    if (error?.message) {
      form.setError('root', { message: error.message });
    }
  }, [error, form]);

  const onSubmit = useCallback(
    async (values: SignInValues) => {
      try {
        const { data } = await signIn({
          variables: {
            SignIn: {
              Email: values.Email as SignInInput['Email'],
              Password: values.Password,
            },
          },
        });

        if (data?.SignIn) {
          onSignedIn();
        }
      } catch {
        // Surfaced through the mutation's `error` state below.
      }
    },
    [onSignedIn, signIn]
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
          <Card className='kicl-inline-size-xl' variant='ghost'>
            <Header denied={denied} />
            <Layout
              alignContent='start'
              alignItems='start'
              autoFlow='row'
              justifyContent='stretch'
              justifyItems='stretch'
            >
              <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
                <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
                  <CardContent>
                    <Email />
                    <Password />
                    <RootError />
                  </CardContent>
                </Layout>
                <CardFooter justifyContent='center'>
                  <Button disabled={loading} type='submit' size='small'>
                    Sign in
                    {loading ? (
                      <Ri.RiLoader4Line aria-hidden className='is-revolving' />
                    ) : null}
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
