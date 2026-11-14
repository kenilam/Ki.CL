import React from 'react';

import classNames from 'classnames';

import { Navigation } from 'design/components';
import { useTranslation } from 'design/hooks';

import { Message } from './message';
import { Resume } from './resume';
import { Workshop } from './workshop';

import './styles.scss';

import { CLASS_NAME as FOOTER } from '@/views/about/footer/constants';

const CLASS_NAME = `${FOOTER}__menu`;

const Menu: React.FunctionComponent = () => {
  const { t } = useTranslation('about');

  return (
    <Navigation
      aria-label={t('menu')}
      autoFlow='row'
      className={classNames(CLASS_NAME, 'kicl-padding-inline-frame-columns-12')}
      gap='normal'
      justifyItems='start'
    >
      <Workshop key='workshop' />
      <Resume key='resume' />
      <Message key='message' />
    </Navigation>
  );
};

export { Menu };
