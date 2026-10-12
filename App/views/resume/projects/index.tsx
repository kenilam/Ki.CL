import React, { useId } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

// Components
import {
  Heading,
  Layout,
  List,
  ListItem,
  Markdown,
  Separator,
  Text,
} from 'design/components';

// Context
import { useVersion } from '@/views/resume/context';

// Constants
import { HEADING } from '@/views/resume/constants';

/** Work outside the day job. A version gives an introduction, a list, or both. */
const Projects: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');

  const {
    projects: { intro, items },
  } = useVersion();

  const titleId = useId();

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <section aria-labelledby={titleId}>
        <Layout autoFlow='row' gap='narrower' justifyItems='stretch'>
          <header>
            <Heading className={classNames(HEADING)} dense id={titleId} is='h2'>
              {t('copy.sections.projects')}
            </Heading>
            <Separator />
          </header>
        </Layout>
        {intro && (
          <Text dense>
            <Markdown>{intro}</Markdown>
          </Text>
        )}
        {items && (
          <List gap='narrow'>
            {items.map((line, index) => (
              <ListItem key={index}>
                <Text dense>
                  <Markdown>{line}</Markdown>
                </Text>
              </ListItem>
            ))}
          </List>
        )}
      </section>
    </Layout>
  );
};

export { Projects };
