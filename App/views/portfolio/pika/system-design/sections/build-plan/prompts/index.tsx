import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { Heading, List, ListItem, Markdown, Text } from 'design/components';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as SYSTEM_DESIGN } from '@/views/portfolio/pika/system-design/constants';

const CLASS_NAME = `${SYSTEM_DESIGN}__prompt`;

const PROMPTS = [
  'skeleton',
  'orchestration',
  'adapters',
  'agent_runtime',
  'eval_harness',
] as const;

const Prompts: React.FunctionComponent = () => {
  const { t } = useTranslation('pika');

  return (
    <>
      <Heading className='kicl-font-size-large' is='h3'>
        {t('title', { context: 'prompts' })}
      </Heading>
      <Text>{t('build_plan.prompts.intro')}</Text>
      <List gap='wide' is='ol'>
        {PROMPTS.map((prompt, index) => (
          <ListItem autoFlow='row' gap='wide' key={prompt}>
            <Text is='strong' className='kicl-font-weight-bold'>
              {/* The list already numbers the items for assistive tech. */}
              <span aria-hidden>
                {t('build_plan.prompts.number', { number: index + 1 })}
              </span>
              {t(`build_plan.prompts.${prompt}.title`)}
            </Text>
            <Text
              className={classNames(
                CLASS_NAME,
                'kicl-padding-block-narrow',
                'kicl-padding-inline',
                'kicl-position-relative'
              )}
            >
              <Markdown>{t(`build_plan.prompts.${prompt}.body`)}</Markdown>
            </Text>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export { CLASS_NAME, Prompts };
