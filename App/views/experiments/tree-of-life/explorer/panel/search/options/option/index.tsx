import React from 'react';

// Context
import { useSearchContext } from '@/views/experiments/tree-of-life/explorer/panel/search/context';

// Constants
import {
  label,
  type Option as Spec,
} from '@/views/experiments/tree-of-life/explorer/panel/search/constants';

type Props = Pick<Spec, 'nodeId'>;

const Option: React.FunctionComponent<Props> = ({ nodeId }) => {
  const { options } = useSearchContext();
  const option = options.find((each) => {
    return each.nodeId === nodeId;
  });

  if (!option) {
    return null;
  }

  return <option value={label(option)} />;
};

export { Option };
