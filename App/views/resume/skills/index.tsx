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

/** One line per area, each led by its name in bold. */
const Skills: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');

  const { skills } = useVersion();

  const titleId = useId();

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <section aria-labelledby={titleId}>
        <Layout autoFlow='row' gap='narrower' justifyItems='stretch'>
          <header>
            <Heading className={classNames(HEADING)} dense id={titleId} is='h2'>
              {t('skills.title')}
            </Heading>
            <Separator />
          </header>
        </Layout>
        <List gap='narrower'>
          {skills.map((line, index) => (
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

export { Skills };
