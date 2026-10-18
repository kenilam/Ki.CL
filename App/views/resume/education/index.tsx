import React, { useId } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

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

/** Degrees, newest first. */
const Education: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');

  const { education } = useVersion();

  const titleId = useId();

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <section aria-labelledby={titleId}>
        <Layout autoFlow='row' gap='narrower' justifyItems='stretch'>
          <header>
            <Heading className={HEADING} dense id={titleId} is='h2'>
              {t('title', { context: 'education' })}
            </Heading>
            <Separator />
          </header>
        </Layout>
        <List gap='narrower'>
          {education.map((line, index) => (
            <ListItem key={index}>
              <Text dense>
                <Markdown>{line}</Markdown>
              </Text>
            </ListItem>
          ))}
        </List>
      </section>
    </Layout>
  );
};

export { Education };
