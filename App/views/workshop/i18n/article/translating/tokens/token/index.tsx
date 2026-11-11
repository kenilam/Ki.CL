import React from 'react';

// Components
import { ListItem, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { TOKENS } from '@/views/workshop/i18n/article/translating/tokens/constants';

type Props = { token: (typeof TOKENS)[number] };

const Token: React.FunctionComponent<Props> = ({ token }) => {
  const { t } = useTranslation('internationalisation');

  return (
    <ListItem>
      <Text is='span'>
        <Markdown>
          {t(`article.translating.${token}`, { nest: false })}
        </Markdown>
      </Text>
    </ListItem>
  );
};

export { Token };
