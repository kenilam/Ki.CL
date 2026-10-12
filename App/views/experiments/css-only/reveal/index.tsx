import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import {
  Card,
  Heading,
  Layout,
  List,
  ListItem,
  Markdown,
  Text,
} from 'design/components';

// Constants
import { ROWS, SECTION } from '@/views/experiments/css-only/constants';

/** Rows that fade in as they enter the window and out as they leave. */
const Reveal: React.FunctionComponent = () => {
  const id = useId();
  const { t } = useTranslation('css-only');

  return (
    <Layout autoFlow='row' gap='narrow'>
      <section aria-labelledby={id} className={classNames(SECTION)}>
        <Heading className='kicl-font-size-large' dense id={id} is='h2'>
          {t('title', { context: 'reveal' })}
        </Heading>
        <Text is='p'>
          <Markdown>{t('text', { context: 'reveal' })}</Markdown>
        </Text>
        <List autoFlow='row' gap='wide'>
          {Array.from({ length: ROWS }, (_, index) => (
            <ListItem className='kicl-scroll-reveal' key={index}>
              <Card>
                <Text is='p'>{t('demo_reveal', { number: index + 1 })}</Text>
              </Card>
            </ListItem>
          ))}
        </List>
      </section>
    </Layout>
  );
};

export { Reveal };
