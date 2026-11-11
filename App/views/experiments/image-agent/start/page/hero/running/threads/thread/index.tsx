import React from 'react';

// API
import {
  Kicl_ImageAgentAllowanceDocument,
  useQuery,
  type Kicl_ImageAgentAllowanceQuery,
} from 'api/provider';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { HyperLink, ListItem } from 'design/components';

// Constants
import { toLabel, toPath } from '@/views/experiments/image-agent/constants';

type Props = Pick<
  Kicl_ImageAgentAllowanceQuery['imageAgentAllowance']['running'][number],
  'id'
>;

const Thread: React.FunctionComponent<Props> = ({ id }) => {
  const { data } = useQuery(Kicl_ImageAgentAllowanceDocument);
  const thread = data?.imageAgentAllowance.running.find((running) => {
    return running.id === id;
  });

  if (!thread) {
    return null;
  }

  return (
    <ListItem>
      <HyperLink
        after={<Tb.TbChevronRight aria-hidden className='kicl-rtl-mirror' />}
        to={toPath(thread.id)}
      >
        {toLabel(thread)}
      </HyperLink>
    </ListItem>
  );
};

export { Thread };
