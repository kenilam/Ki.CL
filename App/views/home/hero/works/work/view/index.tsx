import React from 'react';

import classNames from 'classnames';

import * as Tb from 'react-icons/tb';

import { Layout } from 'design/components';
import { useTranslation } from 'design/hooks';

import './styles.scss';

import { CLASS_NAME as WORK } from '@/views/home/hero/works/work/constants';

const CLASS_NAME = `${WORK}__view`;

const View: React.FunctionComponent = () => {
  const { t } = useTranslation('home');

  return (
    <Layout
      alignItems='center'
      display='flex'
      gap='narrow'
      justifyContent='end'
    >
      <span
        aria-hidden
        className={classNames(
          CLASS_NAME,
          'kicl-font-weight-bold',
          'kicl-letter-spacing-tight',
          'kicl-scroll-focus-reveal-start'
        )}
      >
        <Tb.TbArrowRight />
        {t('action', { context: 'view' })}
      </span>
    </Layout>
  );
};

export { View };
