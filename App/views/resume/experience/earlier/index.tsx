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
  Text,
} from 'design/components';

// Context
import { useVersion } from '@/views/resume/context';

/** The roles before 2014, one line each. */
const Earlier: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');

  const { earlier } = useVersion();

  const titleId = useId();

  return (
    <Layout autoFlow='row' gap='narrower' justifyItems='stretch'>
      <section aria-labelledby={titleId}>
        <Heading dense id={titleId} is='h3'>
          {t('experience.earlier.title')}
        </Heading>
        <List gap='narrower'>
          {earlier.map((line, index) => (
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

export { Earlier };
