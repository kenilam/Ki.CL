import React from 'react';

import classNames from 'classnames';

import * as Tb from 'react-icons/tb';

import { Heading } from 'design/components';
import { useTranslation } from 'design/hooks';

import { useEntered } from '@/views/home/use-entered';

import { Reveal } from './reveal';

import './styles.scss';

import { CLASS_NAME as EXPLORE } from '@/views/home/explore/constants';

const CLASS_NAME = `${EXPLORE}__title`;

const Title: React.FunctionComponent = () => {
  const { t } = useTranslation('home');
  const { entered, ref } = useEntered();

  return (
    <Heading
      className={classNames(
        CLASS_NAME,
        'kicl-font-size-extreme',
        'kicl-letter-spacing-tighter',
        'kicl-line-height-narrower',
        { 'kicl-opacity-0': !entered }
      )}
      is='h2'
      ref={ref}
    >
      {entered ? (
        <Reveal />
      ) : (
        <>
          {t('explore')}
          <Tb.TbArrowRight aria-hidden />
        </>
      )}
    </Heading>
  );
};

export { Title };
