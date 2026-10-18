import React, { useMemo } from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import {
  Dialog,
  Heading,
  List,
  ListItem,
  Markdown,
  Text,
} from 'design/components';

// Diagrams
import { Diagram } from 'design/components';
import { sessionModel } from '@/views/portfolio/pika/system-design/diagrams/session-model';

// Constants
import { CLASS_NAME } from '@/views/portfolio/pika/system-design/constants';

/** The agent runtime, its tables and its turn loop. */
const AgentHarness: React.FunctionComponent = () => {
  const { t } = useTranslation('pika');

  const spec = useMemo(() => sessionModel(t), [t]);

  return (
    <>
      <Heading is='h3' lookLike='h1'>
        {t('title', { context: 'agent_harness' })}
      </Heading>
      <Text>
        <Markdown>{t('part_two.agent_harness.runtime')}</Markdown>
      </Text>
      <Text>
        <Markdown>{t('part_two.agent_harness.tables')}</Markdown>
      </Text>
      <Diagram opens='diagram-session-model' spec={spec} />
      <Dialog
        aria-label={spec.title}
        className={`${CLASS_NAME}__full`}
        fullScreen
        id='diagram-session-model'
      >
        <Diagram
          className={classNames(
            'kicl-inline-size-columns-12',
            'kicl-margin-inline-auto'
          )}
          spec={spec}
        />
      </Dialog>
      <Text>
        <Markdown>{t('part_two.agent_harness.job_id')}</Markdown>
      </Text>
      <List is='ol'>
        <ListItem>
          <Text dense>
            <Markdown>{t('part_two.agent_harness.context')}</Markdown>
          </Text>
        </ListItem>
        <ListItem>
          <Text dense>
            <Markdown>{t('part_two.agent_harness.tools')}</Markdown>
          </Text>
        </ListItem>
        <ListItem>
          <Text dense>
            <Markdown>{t('part_two.agent_harness.execution')}</Markdown>
          </Text>
        </ListItem>
        <ListItem>
          <Text dense>
            <Markdown>{t('part_two.agent_harness.observe')}</Markdown>
          </Text>
        </ListItem>
      </List>
      <Text>{t('part_two.agent_harness.preempt')}</Text>
    </>
  );
};

export { AgentHarness };
