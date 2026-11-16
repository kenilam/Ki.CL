import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Button } from 'design/components';

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
      aria-label={t('action', { context: 'close_navigation' })}
      block
      className={classNames(
        'kicl-font-size',
        'kicl-position-fixed',
        `${CLASS_NAME}__close`,
        'kicl-z-index-raised'
      )}
      command='request-close'
      commandfor={CLASS_NAME}
      size='small'
      variant='tertiary'
    >
      <Tb.TbX aria-hidden />
    </Button>
  );
};

export { Close };
