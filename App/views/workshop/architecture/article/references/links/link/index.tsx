import React from 'react';

// Components
import { ListItem, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { LINKS } from '@/views/workshop/architecture/article/references/links/constants';

type Props = { link: (typeof LINKS)[number] };

const Link: React.FunctionComponent<Props> = ({ link }) => {
  const { t } = useTranslation('architecture');

  return (
    <ListItem>
      <Text is='span'>
        <Markdown>{t(`article.references.${link}`)}</Markdown>
      </Text>
    </ListItem>
  );
};

export { Link };
