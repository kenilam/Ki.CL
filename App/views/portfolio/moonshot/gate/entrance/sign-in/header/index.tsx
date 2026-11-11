import React from 'react';

// Components
import {
  CardDescription,
  CardHeader,
  CardTitle,
  Layout,
} from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useAccessContext } from '@/views/portfolio/moonshot/gate/context';

const Header: React.FunctionComponent = () => {
  const { t } = useTranslation('portfolio');
  const { signedIn } = useAccessContext();

  return (
    <Layout gap='narrow' justifyItems='center'>
      <CardHeader className='kicl-text-align-center'>
        {/* The page's only heading, kept at the card title's size. */}
        <CardTitle className='kicl-font-size' is='h1'>
          {t('title')}
        </CardTitle>
        <CardDescription>
          {/* Signed in, but without access to this piece. */}
          {t('description', { context: signedIn ? 'denied' : 'shared' })}
        </CardDescription>
      </CardHeader>
    </Layout>
  );
};

export { Header };
