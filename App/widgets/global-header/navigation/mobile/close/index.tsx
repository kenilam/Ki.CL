import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Button, Text } from '@/components';

// Icons
import { Ri } from '@/icons';

// Constants
import { CLASS_NAME } from '@/widgets/global-header/navigation/mobile/constants';

// Styles
import './styles.scss';

const COPY = {
  close: 'Close the navigation',
};

const Close: React.FunctionComponent = () => {
  return (
    <Button
      className={classNames(
        'kicl-font-size',
        'kicl-position-fixed',
        `${CLASS_NAME}--toggle`,
        `${CLASS_NAME}--toggle--is-overlaid`
      )}
      command='request-close'
      commandFor={CLASS_NAME}
      unstyled
    >
      <Ri.RiCloseLine aria-hidden />
      <Text className='kicl-hidden' is='span'>
        {COPY.close}
      </Text>
    </Button>
  );
};

export { Close };
