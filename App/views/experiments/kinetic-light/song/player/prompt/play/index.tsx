import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Button } from 'design/components';

// Hooks
import { usePlay } from './use-play';

type Props = Pick<React.ComponentProps<typeof Button>, 'aria-labelledby'>;

const Play: React.FunctionComponent<Props> = (props) => {
  const { busy, button, play, status } = usePlay();

  let icon = <Tb.TbPlayerPlayFilled aria-hidden />;

  if (status === 'ended') {
    icon = <Tb.TbRefresh aria-hidden />;
  }

  return (
    <Button
      {...props}
      busy={busy}
      onClick={() => void play()}
      ref={button}
      size='large'
      variant='secondary'
    >
      {icon}
    </Button>
  );
};

export { Play };
