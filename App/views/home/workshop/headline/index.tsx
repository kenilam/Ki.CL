import React from 'react';

import classNames from 'classnames';

import { Heading, Markdown } from 'design/components';
import { useTranslation } from 'design/hooks';

import { useEntered } from '@/views/use-entered';
import { TITLE_ID } from '@/views/home/workshop/constants';

import { Reveal } from './reveal';

import './styles.scss';

import { CLASS_NAME } from './constants';

const Headline: React.FunctionComponent = () => {
  const { t } = useTranslation('home');
  const { entered, ref } = useEntered();

  return (
    <Heading
      className={classNames(
        CLASS_NAME,
        'kicl-font-size-headline',
        'kicl-max-inline-size-columns-10',
        'kicl-text-align-center',
        { 'kicl-opacity-0': !entered }
      )}
      id={TITLE_ID}
      is='h2'
      ref={ref}
    >
      {entered ? <Reveal /> : <Markdown>{t('workshop')}</Markdown>}
    </Heading>
  );
};

export { Headline };
