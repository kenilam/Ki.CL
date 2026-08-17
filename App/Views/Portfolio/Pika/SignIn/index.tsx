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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Layout,
  Spinner,
  Text,
} from '@/Components';

// Schema
import { SignInSchema, type SignInValues } from './schema';
import classNames from 'classnames';

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
        <section>
          <Card className='kicl-inline-size-xl' is='section'>
            <CardHeader>
              <CardTitle>Private portfolio</CardTitle>
              <CardDescription>
                This piece is shared with a small audience. Sign in with the
                credentials you were given.
              </CardDescription>
            </CardHeader>
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
                      <FormField
                        control={form.control}
                        name='Email'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                autoComplete='username'
                                placeholder='you@example.com'
                                type='email'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='Password'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                autoComplete='current-password'
                                type='password'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {form.formState.errors.root?.message ? (
                        <Text
                          className={classNames(
                            'kicl-font-size-smaller',
                            'kicl-color-error'
                          )}
                          is='p'
                          role='alert'
                        >
                          {form.formState.errors.root.message}
                        </Text>
                      ) : null}
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
        </section>
      </Layout>
    </Animation>
  );
};

export default SignIn;
