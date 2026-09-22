import React from 'react';
import { HyperLink } from '@/components';
import { PATH as EXPERIMENTS } from '@/views/experiments/constants';

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
