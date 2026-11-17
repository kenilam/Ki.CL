import React from 'react';

import { List } from 'design/components';

import { useVersion } from '@/views/resume/context';

import { Role } from './role';

const Roles: React.FunctionComponent = () => {
  const { experience } = useVersion();

  return (
    <List className='kicl-max-inline-size-columns-8' gap='none' is='ol'>
      {experience.map(({ id }) => {
        return <Role id={id} key={id} />;
      })}
    </List>
  );
};

export { Roles };
