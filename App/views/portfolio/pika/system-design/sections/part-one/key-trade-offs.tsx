import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Heading, Markdown, Text } from 'design/components';

/** The decisions that shaped Part 1. */
const KeyTradeOffs: React.FunctionComponent = () => {
  const { t } = useTranslation('pika');

  return (
    <>
      <Heading className='kicl-font-size-large' is='h3'>
        {t('title', { context: 'key_trade_offs' })}
      </Heading>
      <Text>
        <Markdown>{t('part_one.key_trade_offs.async')}</Markdown>
      </Text>
      <Text>
        <Markdown>{t('part_one.key_trade_offs.manifests')}</Markdown>
      </Text>
      <Text>
        <Markdown>{t('part_one.key_trade_offs.temporal')}</Markdown>
      </Text>
      <Text>
        <Markdown>{t('part_one.key_trade_offs.webhooks')}</Markdown>
      </Text>
    </>
  );
};

export { KeyTradeOffs };
