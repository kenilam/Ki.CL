import React, { useId } from 'react';

// Components
import { Heading, Layout, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { NOTES } from '@/views/experiments/swatch/card/article/constants';

type Props = { note: (typeof NOTES)[number] };

const Note: React.FunctionComponent<Props> = ({ note }) => {
  const { t } = useTranslation('swatch');
  const id = useId();

  return (
    <Layout alignContent='start' autoFlow='row' gap='narrow'>
      <section aria-labelledby={id}>
        <Heading id={id} is='h3' lookLike='h4'>
          {t(`article.notes.${note}.title`)}
        </Heading>
        <Text is='p'>
          <Markdown>{t(`article.notes.${note}.text`)}</Markdown>
        </Text>
      </section>
    </Layout>
  );
};

export { Note };
