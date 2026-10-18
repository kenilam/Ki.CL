import React, { useMemo } from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { Dialog, Heading, Markdown, Text } from 'design/components';

// Diagrams
import { Diagram } from 'design/components';
import { requestFlow } from '@/views/portfolio/pika/system-design/diagrams/request-flow';
import { services } from '@/views/portfolio/pika/system-design/diagrams/services';

// Constants
import { CLASS_NAME } from '@/views/portfolio/pika/system-design/constants';

/** The services behind a job, with the request flow. */
const Services: React.FunctionComponent = () => {
  const { t } = useTranslation('pika');

  const flow = useMemo(() => requestFlow(t), [t]);
  const spec = useMemo(() => services(t), [t]);

  return (
    <>
      <Heading is='h3' lookLike='h1'>
        {t('title', { context: 'services' })}
      </Heading>
      <Diagram opens='diagram-services' spec={spec} />
      <Dialog
        aria-label={spec.title}
        className={`${CLASS_NAME}__full`}
        fullScreen
        id='diagram-services'
      >
        <Diagram
          className={classNames(
            'kicl-inline-size-columns-12',
            'kicl-margin-inline-auto'
          )}
          spec={spec}
        />
      </Dialog>
      <Text>{t('part_one.services.registry')}</Text>
      <Text>
        <Markdown>{t('part_one.services.orchestrator')}</Markdown>
      </Text>
      <Text>
        <Markdown>{t('part_one.services.workers')}</Markdown>
      </Text>
      <Text>{t('part_one.services.credits')}</Text>
      <Text>
        <Markdown>{t('part_one.services.numbers')}</Markdown>
      </Text>
      <Diagram opens='diagram-request-flow' spec={flow} />
      <Dialog
        aria-label={flow.title}
        className={`${CLASS_NAME}__full`}
        fullScreen
        id='diagram-request-flow'
      >
        <Diagram
          className={classNames(
            'kicl-inline-size-columns-12',
            'kicl-margin-inline-auto'
          )}
          spec={flow}
        />
      </Dialog>
    </>
  );
};

export { Services };
