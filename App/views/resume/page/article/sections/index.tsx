import React from 'react';

// Context
import { useVersion } from '@/views/resume/context';

// Partials
import { Section } from './section';

/** The version's sections, in its order. */
const Sections: React.FunctionComponent = () => {
  const { order } = useVersion();

  return (
    <>
      {order.map((id) => {
        return <Section id={id} key={id} />;
      })}
    </>
  );
};

export { Sections };
