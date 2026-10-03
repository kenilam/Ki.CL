import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Button, Text } from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

// Constants
import { CLASS_NAME } from './constants';

const COPY = {
  open: 'Open the navigation',
};

const Open: React.FunctionComponent = () => {
  return (
    <Button
      className={classNames('kicl-font-size', `${CLASS_NAME}--toggle`)}
      command='show-modal'
      commandFor={CLASS_NAME}
      unstyled
    >
      <Ri.RiMenuLine aria-hidden />
      <Text className='kicl-hidden' is='span'>
        {COPY.open}
      </Text>
    </Button>
  );
};

export { Open };
