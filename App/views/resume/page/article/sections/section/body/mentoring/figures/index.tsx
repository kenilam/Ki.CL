import React from 'react';

import classNames from 'classnames';

import { Kicl_MentorshipDocument, useQuery } from 'api/provider';

import { List } from 'design/components';

import { Figure } from './figure';

import './styles.scss';

import { CLASS_NAME as SECTION } from '@/views/resume/page/article/sections/section/constants';
import { FIGURES } from './constants';

const Figures: React.FunctionComponent = () => {
  const { loading } = useQuery(Kicl_MentorshipDocument);

  if (loading) {
    return null;
  }

  return (
    <List
      alignItems='baseline'
      className={classNames(`${SECTION}__figures`, 'kicl-print-hidden')}
      display='flex'
      gap='wide'
      wrap
    >
      {FIGURES.map((id) => {
        return <Figure id={id} key={id} />;
      })}
    </List>
  );
};

export { Figures };
