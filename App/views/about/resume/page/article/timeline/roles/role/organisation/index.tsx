import React from 'react';

import classNames from 'classnames';

import { Heading } from 'design/components';

import { useVersion } from '@/views/about/resume/context';

import type { Props } from '@/views/about/resume/page/article/timeline/roles/role';

const Organisation: React.FunctionComponent<Props> = ({ id }) => {
  const role = useVersion().experience.find((each) => {
    return each.id === id;
  });

  if (!role) {
    return null;
  }

  return (
    <Heading
      className={classNames('kicl-scroll-enter-near', 'kicl-text-wrap-balance')}
      dense
      is='h3'
      lookLike='h2'
    >
      {role.organisation}
    </Heading>
  );
};

export { Organisation };
