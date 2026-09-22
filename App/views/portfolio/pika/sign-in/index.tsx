import React, { useCallback, useEffect } from 'react';

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
  Layout,
  Spinner,
} from '@/components';

// Partials
import { Email } from './email';
import { RootError } from './error';
import { Header } from './header';
import { Password } from './password';

// Schema
import { SignInSchema, type SignInValues } from './schema';

type Props = {
  onSignedIn: () => void;
};

const SignIn: React.FunctionComponent<Props> = ({ onSignedIn }) => {
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
    <Animation delay={300}>
      <Layout
        alignContent='center'
        alignItems='center'
        autoFlow='row'
        fullScreen
        justifyContent='center'
        justifyItems='center'
      >
        <div>
          <Card className='kicl-inline-size-xl'>
            <Header />
            <Layout
              alignContent='start'
              alignItems='start'
              autoFlow='row'
              justifyContent='stretch'
              justifyItems='stretch'
            >
              <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent>
                  <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
                    <div>
                      <Email />
                      <Password />
                      <RootError />
                    </div>
                  </Layout>
                </CardContent>
                <CardFooter>
                  <Button disabled={loading} type='submit' size='small'>
                    Sign in
                    <Spinner in={loading} />
                  </Button>
                </CardFooter>
              </Form>
            </Layout>
          </Card>
        </div>
      </Layout>
    </Animation>
  );
};

export { SignIn };
