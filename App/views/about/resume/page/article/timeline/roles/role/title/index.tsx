import React from 'react';

import { Text } from 'design/components';

import { useVersion } from '@/views/about/resume/context';

import type { Props } from '@/views/about/resume/page/article/timeline/roles/role';

const Title: React.FunctionComponent<Props> = ({ id }) => {
  const role = useVersion().experience.find((each) => {
    return each.id === id;
  });

  if (!role) {
    return null;
  }

  return (
    <Text className='kicl-scroll-enter-near' dense lookLike='strong'>
      {role.title}
    </Text>
  );
};

export { Title };
