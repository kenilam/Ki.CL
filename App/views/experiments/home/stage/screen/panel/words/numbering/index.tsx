import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useScreenContext } from '@/views/experiments/home/stage/screen/context';

const Numbering: React.FunctionComponent = () => {
  const { t } = useTranslation('experiments');
  const { number } = useScreenContext();

  return (
    <Text
      is='p'
      dense
      variant='secondary'
      className={classNames(
        'kicl-font-size-small',
        'kicl-letter-spacing',
        'kicl-text-transform-uppercase'
      )}
    >
      {t('number', { number })}
    </Text>
  );
};

export { Numbering };
