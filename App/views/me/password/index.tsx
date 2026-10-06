import React from 'react';

// Icons
import * as Ri from 'react-icons/ri';

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
  HyperLink,
  Spinner,
} from 'design/components';

// Views
import { useAccount } from '@/views/account/use-account';

// Partials
import { PasswordForm } from './form';

// Hooks
import { usePasswordChange } from './use-password-change';

// Constants
import { COPY } from './constants';

const TITLES = {
  loading: COPY.title,
  idle: COPY.title,
  waiting: COPY.waiting,
  saving: COPY.saving,
  done: COPY.done,
  expired: COPY.expired,
  failed: COPY.failed,
};

const Password: React.FunctionComponent = () => {
  const { me } = useAccount();
  const { reset, stage, start } = usePasswordChange();

  const busy = stage === 'loading' || stage === 'waiting' || stage === 'saving';
  const ended = stage === 'expired' || stage === 'failed';

  return (
    <Card className='kicl-inline-size-xl'>
      <CardHeader>
        {stage !== 'done' ? (
          <HyperLink
            before={<Ri.RiArrowGoBackLine />}
            lookLikeButton
            size='small'
            to='..'
            variant='secondary'
          >
            {COPY.goBack}
          </HyperLink>
        ) : null}
        {/* Announced as it changes: the answer arrives from another tab or device. */}
        <CardTitle aria-live='polite' className='kicl-font-size' is='h1'>
          {TITLES[stage]}
        </CardTitle>
        {stage === 'idle' && (
          <Animation>
            <CardDescription>{COPY.description}</CardDescription>
          </Animation>
        )}
        {stage === 'waiting' && (
          <Animation>
            <CardDescription>
              {COPY.sentTo} {me?.Email}. {COPY.keepOpen}
            </CardDescription>
          </Animation>
        )}
      </CardHeader>
      {stage === 'idle' && <PasswordForm onSubmit={start} />}
      {busy && (
        <CardContent>
          <Spinner in position='inline' />
        </CardContent>
      )}
      {!busy && stage !== 'idle' && (
        <Animation property='slide-from-bottom'>
          <CardFooter>
            {ended && (
              <Button onClick={reset} size='small'>
                {COPY.again}
              </Button>
            )}
            <HyperLink lookLikeButton size='small' to='..' variant='secondary'>
              {COPY.back}
            </HyperLink>
          </CardFooter>
        </Animation>
      )}
    </Card>
  );
};

export { Password };
