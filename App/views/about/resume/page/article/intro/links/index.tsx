import React from 'react';

import classNames from 'classnames';

import { Layout } from 'design/components';
import { useTranslation } from 'design/hooks';

import { Actions } from './actions';
import { Contact } from './contact';

const Links: React.FunctionComponent = () => {
  const { t } = useTranslation('about');

  return (
    <Layout autoFlow='row' gap='narrower' justifyItems='start'>
      <nav
        aria-label={t('links')}
        className={classNames(
          'kicl-padding-block-start',
          'kicl-scroll-leave-near'
        )}
      >
        <Contact />
        <Actions />
      </nav>
    </Layout>
  );
};

export { Links };
