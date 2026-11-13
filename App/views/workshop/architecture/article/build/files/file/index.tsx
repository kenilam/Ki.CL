import React from 'react';

// Components
import { ListItem, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { FILES } from '@/views/workshop/architecture/article/build/files/constants';

type Props = { file: (typeof FILES)[number] };

const File: React.FunctionComponent<Props> = ({ file }) => {
  const { t } = useTranslation('architecture');

  return (
    <ListItem>
      <Text is='span'>
        <Markdown>{t(`article.build.${file}`)}</Markdown>
      </Text>
    </ListItem>
  );
};

export { File };
