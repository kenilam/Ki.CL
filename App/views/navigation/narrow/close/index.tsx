import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Button, Text } from 'design/components';

// Icons
import * as Tb from 'react-icons/tb';

// Constants
import { CLASS_NAME } from '@/views/navigation/narrow/constants';

// Hooks
import { useTranslation } from 'design/hooks';

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
      <Tb.TbX aria-hidden />
      <Text className='kicl-hidden' is='span'>
        {t('action', { context: 'close_navigation' })}
      </Text>
    </Button>
  );
};

export { Close };
