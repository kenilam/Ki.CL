import React, { useMemo } from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { Dialog, Heading, Text } from 'design/components';

// Diagrams
import { Diagram } from 'design/components';
import { agentPlane } from '@/views/portfolio/pika/system-design/diagrams/agent-plane';

// Constants
import { CLASS_NAME } from '@/views/portfolio/pika/system-design/constants';

/** What the agent reuses from Part 1. */
const WhatChanges: React.FunctionComponent = () => {
  const { t } = useTranslation('pika');

  const spec = useMemo(() => agentPlane(t), [t]);

  return (
    <>
      <Heading is='h3' lookLike='h1'>
        {t('title', { context: 'what_changes' })}
      </Heading>
      <Diagram opens='diagram-agent-plane' spec={spec} />
      <Dialog
        aria-label={spec.title}
        className={`${CLASS_NAME}__full`}
        fullScreen
        id='diagram-agent-plane'
      >
        <Diagram
          className={classNames(
            'kicl-inline-size-columns-12',
            'kicl-margin-inline-auto'
          )}
          spec={spec}
        />
      </Dialog>
      <Text>{t('part_two.what_changes.client')}</Text>
    </>
  );
};

export { WhatChanges };
