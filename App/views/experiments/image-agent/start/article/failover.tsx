import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import {
  Details,
  Heading,
  List,
  ListItem,
  Markdown,
  Text,
} from 'design/components';

/** One line each: the kind of call, then its providers in the order tried. */
const CHAINS = ['pictures', 'text', 'reviews'] as const;

const TIMEOUTS = ['text', 'review', 'images'] as const;

/** Failover: the provider chains, timeouts, cooldowns, and what waiting means. */
const Failover: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');

  return (
    <Details
      className='kicl-max-inline-size-columns-8'
      gap='narrow'
      summary={
        <Heading dense is='h3' lookLike='h1'>
          {t('article.failover.title')}
        </Heading>
      }
    >
      <Text is='p'>{t('article.failover.chains_intro')}</Text>
      <List gap='narrower' listStyleType='disc'>
        {CHAINS.map((context) => (
          <ListItem key={context}>
            <Text is='span'>
              <Markdown>{t('article.failover.chain', { context })}</Markdown>
            </Text>
          </ListItem>
        ))}
      </List>
      <Text is='p'>{t('article.failover.groq')}</Text>
      <Heading is='h4' lookLike='h2'>
        {t('article.failover.title', { context: 'timeouts' })}
      </Heading>
      <Text is='p'>{t('article.failover.timeouts_intro')}</Text>
      <List gap='narrower' listStyleType='disc'>
        {TIMEOUTS.map((context) => (
          <ListItem key={context}>
            <Text is='span'>{t('article.failover.timeout', { context })}</Text>
          </ListItem>
        ))}
      </List>
      <Text is='p'>{t('article.failover.timeouts')}</Text>
      <Text is='p'>{t('article.failover.retries')}</Text>
      <Heading is='h4' lookLike='h2'>
        {t('article.failover.title', { context: 'quota' })}
      </Heading>
      <Text is='p'>{t('article.failover.alike')}</Text>
      <Text is='p'>{t('article.failover.quota')}</Text>
      <Text is='p'>{t('article.failover.before_split')}</Text>
      <Heading is='h4' lookLike='h2'>
        {t('article.failover.title', { context: 'everything' })}
      </Heading>
      <Text is='p'>{t('article.failover.everything')}</Text>
      <Text is='p'>{t('article.failover.refill')}</Text>
      <Text is='p'>{t('article.failover.first_version')}</Text>
    </Details>
  );
};

export { Failover };
