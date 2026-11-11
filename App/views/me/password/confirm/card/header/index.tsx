import React from 'react';

// Components
import {
  CardDescription,
  CardHeader,
  CardTitle,
  Layout,
  Spinner,
} from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useConfirmContext } from '@/views/me/password/confirm/context';

const Header: React.FunctionComponent = () => {
  const { t } = useTranslation('me');
  const { checking, confirmed } = useConfirmContext();

  return (
    <Layout gap='narrow' justifyItems='center'>
      <CardHeader className='kicl-text-align-center'>
        <CardTitle aria-live='polite' className='kicl-font-size' is='h1'>
          {t('title', { context: confirmed ? 'confirmed' : 'confirm' })}
        </CardTitle>
        {confirmed || !checking ? (
          <CardDescription>
            {t('description', {
              context: confirmed ? 'confirmed' : 'confirm',
            })}
          </CardDescription>
        ) : null}
        <Spinner in={checking} position='inline' />
      </CardHeader>
    </Layout>
  );
};

export { Header };
