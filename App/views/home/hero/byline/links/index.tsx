import React from 'react';

import { List } from 'design/components';

import { Github } from './github';
import { Linkedin } from './linkedin';
import { Message } from './message';

const Links: React.FunctionComponent = () => {
  return (
    <List
      alignItems='center'
      display='flex'
      gap='narrow'
      justifyContent='center'
      wrap
    >
      <Github />
      <Linkedin />
      <Message />
    </List>
  );
};

export { Links };
