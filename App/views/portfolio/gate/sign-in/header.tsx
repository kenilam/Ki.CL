import React from 'react';

import { useTranslation } from 'react-i18next';

// Components
import {
  CardDescription,
  CardHeader,
  CardTitle,
  Layout,
} from 'design/components';

type Props = {
  /** Signed in, but without access to this piece. */
  denied?: boolean;
};

const Header: React.FunctionComponent<Props> = ({ denied = false }) => {
  const { t } = useTranslation('portfolio');

  return (
    <Layout gap='narrow' justifyItems='center'>
      <CardHeader className='kicl-text-align-center'>
        {/* The page's only heading, kept at the card title's size. */}
        <CardTitle className='kicl-font-size' is='h1'>
          {t('title')}
        </CardTitle>
        <CardDescription>
          {t('description', { context: denied ? 'denied' : 'shared' })}
        </CardDescription>
      </CardHeader>
    </Layout>
  );
};

export { Header };
