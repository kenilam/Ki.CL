import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Button, ListItem } from 'design/components';

// Context
import { useSenderContext } from '@/views/experiments/image-agent/chat/context';

type Props = {
  /** The answer, as the agent offered it. */
  choice: string;
};

const Choice: React.FunctionComponent<Props> = ({ choice }) => {
  const { send } = useSenderContext();

  return (
    <ListItem>
      <Button
        before={<Tb.TbCircle aria-hidden />}
        onClick={() => {
          void send(choice);
        }}
        size='small'
        variant='secondary'
      >
        {choice}
      </Button>
    </ListItem>
  );
};

export { Choice };
