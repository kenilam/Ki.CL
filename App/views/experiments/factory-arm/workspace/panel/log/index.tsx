import React from 'react';

// Components
import { Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useLogContext } from '@/views/experiments/factory-arm/log-context';

// Partials
import { Clear } from './clear';
import { Run } from './run';
import { Steps } from './steps';

/**
 * Every step the cell took, newest first: where each case went from and to,
 * what was given up and why, what hit what, and what was tried again. The
 * run under way is open; each earlier one folds into a disclosure named by
 * how it started, to open when wanted.
 */
const Log: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');
  const { log } = useLogContext();
  // The runs, newest first.
  const [latest, ...earlier] = [...new Set(log.map(({ run }) => run))];

  return (
    <>
      {latest === undefined ? (
        <Text className='kicl-color-grey' is='p'>
          {t('status', { context: 'empty' })}
        </Text>
      ) : (
        <>
          <Steps run={latest} />

          {earlier.map((run) => {
            return <Run id={run} key={run} />;
          })}
        </>
      )}

      <Clear />
    </>
  );
};

export { Log };
