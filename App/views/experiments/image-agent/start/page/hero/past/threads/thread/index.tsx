import React from 'react';

// Libraries
import Highlighter from 'react-highlight-words';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { HyperLink, ListItem } from 'design/components';

// Hooks
import { usePast } from '@/views/experiments/image-agent/start/page/hero/past/use-past';

// Constants
import { toLabel, toPath } from '@/views/experiments/image-agent/constants';

type Props = Pick<ReturnType<typeof usePast>['threads'][number], 'id'>;

const Thread: React.FunctionComponent<Props> = ({ id }) => {
  const { threads, words } = usePast();
  const thread = threads.find((match) => {
    return match.id === id;
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
        <Highlighter
          autoEscape
          searchWords={words}
          textToHighlight={toLabel(thread)}
        />
      </HyperLink>
    </ListItem>
  );
};

export { Thread };
