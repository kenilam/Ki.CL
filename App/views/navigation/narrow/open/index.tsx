import React from 'react';

// Components
import { Button, Text } from 'design/components';

// Icons
import * as Tb from 'react-icons/tb';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { CLASS_NAME } from '@/views/navigation/narrow/constants';

const Open: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Button
      className='kicl-font-size'
      command='show-modal'
      commandfor={CLASS_NAME}
      unstyled
    >
      <Tb.TbMenu2 aria-hidden />
      <Text className='kicl-hidden' is='span'>
        {t('action', { context: 'open_navigation' })}
      </Text>
    </Button>
  );
};

export { Open };
