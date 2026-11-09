import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { Button, Text } from 'design/components';

// Icons
import * as Bs from 'react-icons/bs';

// Constants
import { CLASS_NAME } from '@/views/navigation/mobile/constants';

// Styles
import './styles.scss';

const Close: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Button
      className={classNames(
        'kicl-font-size',
        'kicl-position-fixed',
        `${CLASS_NAME}--toggle`,
        `${CLASS_NAME}--toggle--is-overlaid`,
        'kicl-z-index-raised'
      )}
      command='request-close'
      commandfor={CLASS_NAME}
      unstyled
    >
      <Bs.BsXLg aria-hidden />
      <Text className='kicl-hidden' is='span'>
        {t('action', { context: 'close_navigation' })}
      </Text>
    </Button>
  );
};

export { Close };
