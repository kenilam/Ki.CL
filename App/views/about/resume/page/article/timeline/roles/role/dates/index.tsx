import React from 'react';

import classNames from 'classnames';

import { Text } from 'design/components';

import { useVersion } from '@/views/about/resume/context';

import type { Props } from '@/views/about/resume/page/article/timeline/roles/role';

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
        'kicl-color-neutral-80',
        'kicl-font-family-mono',
        'kicl-font-size-small',
        'kicl-scroll-enter-far',
        'kicl-text-transform-uppercase'
      )}
      dense
    >
      {role.dates}
    </Text>
  );
};

export { Dates };
