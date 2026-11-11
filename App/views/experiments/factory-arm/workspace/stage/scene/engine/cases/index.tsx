import React from 'react';

// Context
import { useCasesContext } from '@/views/experiments/factory-arm/workspace/cases-context';

// Partials
import { Case } from './case';

const Cases: React.FunctionComponent = () => {
  const { boxes } = useCasesContext();

  return (
    <>
      {boxes.map((box) => {
        return <Case id={box.id} key={box.id} />;
      })}
    </>
  );
};

export { Cases };
