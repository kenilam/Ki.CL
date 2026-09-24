import React from 'react';

// Components
import { Button, List, ListItem, Text } from '@/components';

// Constants
import { CLASS_NAME as MESSAGE } from '@/views/experiments/image-agent/chat/conversation/message/constants';
import { Ri } from '@/icons';

const CLASS_NAME = `${MESSAGE}__choices`;

type Props = {
  choices: ReadonlyArray<string>;
  onChoose: (text: string) => unknown;
};

/** Replies to a question the person can pick instead of typing. */
const Choices: React.FunctionComponent<Props> = ({ choices, onChoose }) => (
  <List is='ul' className={CLASS_NAME} display='flex' gap='narrower' wrap>
    {choices.map((choice) => (
      <ListItem key={choice}>
        <Button
          is='button'
          onClick={() => void onChoose(choice)}
          size='small'
          variant='secondary'
        >
          <Ri.RiCircleLine />
          <Text is='span'>{choice}</Text>
        </Button>
      </ListItem>
    ))}
  </List>
);

export { Choices };
