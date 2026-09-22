import React from 'react';
import { HyperLink } from '@/Components';
import { PATH as EXPERIMENTS } from '@/Views/Experiments/constants';

const COPY = {
  bookmark: 'Bookmark this page',
};

export const Bookmark: React.FunctionComponent = () => {
  return (
    <HyperLink
      lookLikeButton
      size='small'
      to={`/${EXPERIMENTS}`}
    >
      {COPY.bookmark}
    </HyperLink>
  );
}
