import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { Animation, Heading, Layout, List, Text } from 'design/components';

// Partials
import { Placeholder } from './placeholder';
import { Topic } from './topic';

// Constants
import { CLASS_NAME, PLACEHOLDERS, TOPICS } from './constants';

/** The workshop index: a card for each topic, then the ones still to come. */
const Home: React.FunctionComponent = () => {
  const translations = {
    common: useTranslation(),
    workshop: useTranslation('workshop'),
  };
  const titleId = useId();

  return (
    <Animation delay={1000}>
      <Layout autoFlow='row' gap='normal'>
        <section
          aria-labelledby={titleId}
          className={classNames(
            CLASS_NAME,
            'kicl-inline-size-full',
            'kicl-padding-block-extreme',
            'kicl-padding-inline-frame-columns-12'
          )}
        >
          <Heading className='kicl-font-size-huge' id={titleId}>
            {translations.common.t('workshop')}
          </Heading>
          <Text>{translations.workshop.t('message')}</Text>
          {/* Two a row, and one a row on phones. */}
          <List fill={6} gap='normal'>
            {TOPICS.map((topic) => (
              <Topic key={topic.to} {...topic} />
            ))}
            {Array.from({ length: PLACEHOLDERS }, (_, index) => (
              <Placeholder key={index} />
            ))}
          </List>
        </section>
      </Layout>
    </Animation>
  );
};

export { Home };
