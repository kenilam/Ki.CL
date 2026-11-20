import React from 'react';

// Partials
import { Allowance } from './allowance';
import { Generate } from './generate';
import { Privacy } from './privacy';

// Context
import { useMaker } from '@/views/experiments/swatch/maker/context';

// Hooks
import { useSpent } from '@/views/experiments/swatch/use-spent';

const ACTIONS = {
  true: <Allowance />,
  false: <Generate />,
};

const Footer: React.FunctionComponent = () => {
  const { busy } = useMaker();
  const spent = useSpent();

  return (
    <>
      <Privacy />
      {ACTIONS[String(spent && !busy)]}
    </>
  );
};

export { Footer };
