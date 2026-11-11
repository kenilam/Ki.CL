import React from 'react';

// Components
import { ListItem, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { MATCHES } from '@/views/workshop/i18n/article/negotiation/matches/constants';

type Props = { match: (typeof MATCHES)[number] };

const Match: React.FunctionComponent<Props> = ({ match }) => {
  const { t } = useTranslation('internationalisation');

  return (
    <ListItem>
      <Text is='span'>
        <Markdown>{t(`article.negotiation.${match}`)}</Markdown>
      </Text>
    </ListItem>
  );
};

export { Match };
