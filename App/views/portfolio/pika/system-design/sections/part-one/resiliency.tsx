import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Heading, List, ListItem, Markdown, Text } from 'design/components';

/** How task attempts fail and recover. */
const Resiliency: React.FunctionComponent = () => {
  const { t } = useTranslation('pika');

  return (
    <>
      <Heading is='h3' lookLike='h1'>
        {t('title', { context: 'resiliency' })}
      </Heading>
      <Text>{t('part_one.resiliency.intro')}</Text>
      <List is='ul'>
        <ListItem>
          <Text dense>
            <Markdown>{t('part_one.resiliency.retries')}</Markdown>
          </Text>
        </ListItem>
        <ListItem>
          <Text dense>
            <Markdown>{t('part_one.resiliency.checkpoint')}</Markdown>
          </Text>
        </ListItem>
        <ListItem>
          <Text dense>
            <Markdown>{t('part_one.resiliency.watchdogs')}</Markdown>
          </Text>
        </ListItem>
        <ListItem>
          <Text dense>
            <Markdown>{t('part_one.resiliency.monitoring')}</Markdown>
          </Text>
        </ListItem>
        <ListItem>
          <Text dense>
            <Markdown>{t('part_one.resiliency.backpressure')}</Markdown>
          </Text>
        </ListItem>
      </List>
    </>
  );
};

export { Resiliency };
