import React from 'react';

import { useTranslation } from 'react-i18next';

// Icons
import * as Ri from 'react-icons/ri';

// Components
import {
  Animation,
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  HyperLink,
  Layout,
  Spinner,
} from 'design/components';

// Views
import { useAccount } from '@/views/account/use-account';

// Partials
import { PasswordForm } from './form';

// Hooks
import { usePasswordChange } from './use-password-change';

const Password: React.FunctionComponent = () => {
  const { t } = useTranslation('me');
  const { t: common } = useTranslation();
  const { me } = useAccount();
  const { reset, stage, start } = usePasswordChange();

  const busy = stage === 'loading' || stage === 'waiting' || stage === 'saving';
  const ended = stage === 'expired' || stage === 'failed';

  return (
    <Card is='section' size='max' variant='secondary'>
      <Layout gap='narrow' justifyItems='center'>
        <CardHeader className='kicl-text-align-center'>
          {stage !== 'done' ? (
            <HyperLink
              before={<Ri.RiArrowGoBackLine />}
              lookLikeButton
              size='small'
              to='..'
              variant='secondary'
            >
              {common('action', { context: 'go_back' })}
            </HyperLink>
          ) : null}
          {/* Announced as it changes: the answer arrives from another tab or device. */}
          <CardTitle aria-live='polite' className='kicl-font-size' is='h1'>
            {t('title', { context: stage })}
          </CardTitle>
          {stage === 'idle' && (
            <Animation>
              <CardDescription>
                {t('description', { context: 'idle' })}
              </CardDescription>
            </Animation>
          )}
          {stage === 'waiting' && (
            <Animation>
              <CardDescription>
                {t('description', { context: 'waiting', email: me?.Email })}
              </CardDescription>
            </Animation>
          )}
        </CardHeader>
      </Layout>
      {stage === 'idle' && <PasswordForm onSubmit={start} />}
      {busy && (
        <Spinner className='kicl-justify-self-center' in position='inline' />
      )}
      {!busy && stage !== 'idle' && (
        <Animation property='slide-from-bottom'>
          <CardFooter justifyContent='center'>
            {/* Go back is still above while it can be tried again, so only done links back. */}
            {ended ? (
              <Button onClick={reset} size='small'>
                {t('action', { context: 'again' })}
              </Button>
            ) : (
              <HyperLink
                lookLikeButton
                size='small'
                to='..'
                variant='secondary'
              >
                {t('action', { context: 'back' })}
              </HyperLink>
            )}
          </CardFooter>
        </Animation>
      )}
    </Card>
  );
};

export { Password };
