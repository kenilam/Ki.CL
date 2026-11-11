import React from 'react';

// Components
import {
  Animation,
  BackLink,
  CardDescription,
  CardHeader,
  CardTitle,
  Layout,
} from 'design/components';

// Views
import { useAccount } from '@/views/account/use-account';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { usePasswordChangeContext } from '@/views/context';

const Header: React.FunctionComponent = () => {
  const { t } = useTranslation('me');
  const { me } = useAccount();
  const { stage } = usePasswordChangeContext();

  return (
    <Layout gap='narrow' justifyItems='center'>
      <CardHeader className='kicl-text-align-center'>
        {stage !== 'done' ? <BackLink /> : null}
        {/* Announced as it changes: the answer arrives from another tab or device. */}
        <CardTitle aria-live='polite' className='kicl-font-size' is='h1'>
          {t('title', { context: stage })}
        </CardTitle>
        {stage === 'idle' ? (
          <Animation>
            <CardDescription>
              {t('description', { context: 'idle' })}
            </CardDescription>
          </Animation>
        ) : null}
        {stage === 'waiting' ? (
          <Animation>
            <CardDescription>
              {t('description', { context: 'waiting', email: me?.email })}
            </CardDescription>
          </Animation>
        ) : null}
      </CardHeader>
    </Layout>
  );
};

export { Header };
