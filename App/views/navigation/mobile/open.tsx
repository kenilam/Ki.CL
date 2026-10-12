import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { Button, Text } from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

// Constants
import { CLASS_NAME } from './constants';

const Open: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Button
      className={classNames('kicl-font-size', `${CLASS_NAME}--toggle`)}
      command='show-modal'
      commandFor={CLASS_NAME}
      unstyled
    >
      <Ri.RiMenuLine aria-hidden />
      <Text className='kicl-hidden' is='span'>
        {t('navigation.open')}
      </Text>
    </Button>
  );
};

export { Open };
