import React from 'react';

// Components
import { Heading } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Paragraphs } from './paragraphs';

// Constants
import type { STORIES } from '@/views/workshop/i18n/article/rtl/stories/constants';

type Props = Pick<(typeof STORIES)[number], 'context'>;

const Story: React.FunctionComponent<Props> = ({ context }) => {
  const { t } = useTranslation('internationalisation');

  return (
    <>
      <Heading is='h3' lookLike='h2'>
        {t('article.rtl.title', { context })}
      </Heading>
      <Paragraphs context={context} />
    </>
  );
};

export { Story };
