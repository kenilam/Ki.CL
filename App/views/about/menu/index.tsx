import React from 'react';

import classNames from 'classnames';

import { Navigation } from 'design/components';
import { useTranslation } from 'design/hooks';
import { useMatch } from 'design/router';

import { PAGES } from '@/views/routes';

import { About } from './about';
import { Message } from './message';
import { Resume } from './resume';
import { Workshop } from './workshop';

import './styles.scss';

import { CLASS_NAME as ABOUT } from '@/views/about/constants';

const CLASS_NAME = `${ABOUT}__menu`;

const OTHER = {
  true: <About key='about' />,
  false: <Resume key='resume' />,
};

const Menu: React.FunctionComponent = () => {
  const { t } = useTranslation('about');
  const resume = useMatch(`${PAGES.resume}/*`);

  return (
    <Navigation
      aria-label={t('menu')}
      autoFlow='row'
      className={classNames(CLASS_NAME, 'kicl-padding-inline-frame-columns-12')}
      gap='normal'
      justifyItems='start'
    >
      <Workshop key='workshop' />
      {OTHER[String(Boolean(resume))]}
      <Message key='message' />
    </Navigation>
  );
};

export { Menu };
