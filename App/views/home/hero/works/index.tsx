import React from 'react';

import { Animation, List } from 'design/components';
import { useTranslation } from 'design/hooks';

import { Work } from './work';

import { CLASS_NAME, WORKS } from './constants';

const Works: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Animation property='slide-from-bottom' delay={1000}>
      <List aria-label={t('experiments')} className={CLASS_NAME} gap='wider'>
        {WORKS.map((plate) => {
          return <Work key={plate} plate={plate} />;
        })}
      </List>
    </Animation>
  );
};

export { Works };
