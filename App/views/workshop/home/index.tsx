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
  const { t } = useTranslation('workshop');
  const { t: common } = useTranslation();
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
            {common('workshop')}
          </Heading>
          <Text>{t('message')}</Text>
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
