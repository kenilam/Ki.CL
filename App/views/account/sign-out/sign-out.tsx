import React, { useId, useState } from 'react';

// Components
import {
  AnimatedText,
  Animation,
  Button,
  Dialog,
  Heading,
  Layout,
  List,
  ListItem,
  Spinner,
} from 'design/components';

// Session
import { useSignOut } from '@/session';

// Constants
import { COPY, SIGN_OUT_ID } from '@/views/account/constants';

/**
 * Asks before signing out, then waits in place while the session is
 * replaced. It goes away with the account around it, once the page knows the
 * visitor is anonymous.
 */
const SignOut: React.FunctionComponent = () => {
  const signOut = useSignOut();

  const titleId = useId();
  const messageId = useId();

  const [state, setState] = useState<'idle' | 'pending' | 'failed'>('idle');

  const pending = state === 'pending';

  const confirm = async () => {
    setState('pending');

    try {
      await signOut();
    } catch {
      setState('failed');
    }
  };

  return (
    <Dialog
      aria-describedby={messageId}
      aria-labelledby={titleId}
      closable={pending ? false : 'keyboard'}
      id={SIGN_OUT_ID}
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
              <AnimatedText className='kicl-color-error' is='span' role='alert'>
                {pending ? COPY.signingOut : COPY.confirm}
              </AnimatedText>
            </Heading>
          </Animation>
          <Animation property='slide-from-top'>
            <AnimatedText className='kicl-text-align-center'>
              {COPY.message}
            </AnimatedText>
          </Animation>
          <Spinner in={pending} position='inline' />
          <Animation in={state === 'failed'}>
            <AnimatedText className='kicl-color-error' is='p' role='alert'>
              {COPY.failed}
            </AnimatedText>
          </Animation>
          <Animation in={!pending} property='slide-from-top' delay={300}>
            <List autoFlow='column' gap='narrow' justifyContent='center'>
              <ListItem>
                <Button
                  command='request-close'
                  commandFor={SIGN_OUT_ID}
                  variant='tertiary'
                >
                  {COPY.cancel}
                </Button>
              </ListItem>
              <ListItem>
                <Button onClick={confirm} variant='ghost'>
                  {COPY.signOut}
                </Button>
              </ListItem>
            </List>
          </Animation>
        </section>
      </Layout>
    </Dialog>
  );
};

export { SignOut };
