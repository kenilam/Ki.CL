import React from 'react';

// Context
import { useSearchContext } from '@/views/experiments/tree-of-life/explorer/panel/search/context';

// Partials
import { Option } from './option';

// Constants
import { LIST_ID } from '@/views/experiments/tree-of-life/explorer/panel/search/constants';

const Options: React.FunctionComponent = () => {
  const { options } = useSearchContext();

  return (
    <datalist id={LIST_ID}>
      {options.map(({ nodeId }) => {
        return <Option key={nodeId} nodeId={nodeId} />;
      })}
    </datalist>
  );
};

export { Options };
