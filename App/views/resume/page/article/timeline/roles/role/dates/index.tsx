import React from 'react';

import classNames from 'classnames';

import { Text } from 'design/components';

import { useVersion } from '@/views/resume/context';

import type { Props } from '@/views/resume/page/article/timeline/roles/role';

const Dates: React.FunctionComponent<Props> = ({ id }) => {
  const role = useVersion().experience.find((each) => {
    return each.id === id;
  });

  if (!role) {
    return null;
  }

  return (
    <Text
      className={classNames(
        'kicl-font-family-mono',
        'kicl-scroll-shift-narrow',
        'kicl-text-box-trim-start'
      )}
      dense
      is='span'
      lookLike='small'
      variant='secondary'
    >
      {role.dates}
    </Text>
  );
};

export { Dates };
