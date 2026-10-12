import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import {
  Button,
  Heading,
  Layout,
  Markdown,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from 'design/components';

// Constants
import { SECTION } from '@/views/experiments/css-only/constants';

/** A popover that stays beside its button and flips when there is no room. */
const Anchored: React.FunctionComponent = () => {
  const id = useId();
  const { t } = useTranslation('css-only');

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='start'>
      <section aria-labelledby={id} className={classNames(SECTION)}>
        <Heading className='kicl-font-size-large' dense id={id} is='h2'>
          {t('title', { context: 'anchored' })}
        </Heading>
        <Text is='p'>
          <Markdown>{t('text', { context: 'anchored' })}</Markdown>
        </Text>
        <Popover>
          <PopoverTrigger asChild>
            <Button size='small' variant='secondary'>
              {t('action', { context: 'open' })}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Text is='p'>{t('demo', { context: 'anchored' })}</Text>
          </PopoverContent>
        </Popover>
      </section>
    </Layout>
  );
};

export { Anchored };
