import React from 'react';

import { useVersion } from '@/views/resume/context';

import { Section } from './section';

const Sections: React.FunctionComponent = () => {
  const { order } = useVersion();

  return order.map((id) => {
    return <Section id={id} key={id} />;
  });
};

export { Sections };
