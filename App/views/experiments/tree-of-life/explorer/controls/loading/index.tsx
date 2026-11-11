import React from 'react';

// Components
import { Spinner } from 'design/components';

// Context
import { useSubtreeContext } from '@/views/experiments/tree-of-life/subtree-context';

const Loading: React.FunctionComponent = () => {
  const { loading } = useSubtreeContext();

  return <Spinner in={loading} position='inline' size='small' />;
};

export { Loading };
