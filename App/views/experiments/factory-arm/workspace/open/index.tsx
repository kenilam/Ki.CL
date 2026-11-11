import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Button } from 'design/components';

// Icons
import * as Tb from 'react-icons/tb';

// Hooks
import { useTranslation } from 'design/hooks';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME, PANEL } from '@/views/experiments/factory-arm/constants';

const Open: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');

  return (
    <Button
      className={classNames(
        `${CLASS_NAME}__open`,
        'kicl-position-fixed',
        'kicl-inset-block-start',
        'kicl-inset-inline-end',
        'kicl-z-index-floating'
      )}
      aria-label={t('action', { context: 'open_setup' })}
      popoverTarget={PANEL}
      variant='secondary'
    >
      <Tb.TbSettings aria-hidden />
    </Button>
  );
};

export { Open };
