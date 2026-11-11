import React from 'react';

// Components
import { Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { EXAMPLES } from '@/views/workshop/i18n/article/negotiation/examples/constants';

type Props = { context: (typeof EXAMPLES)[number] };

const Example: React.FunctionComponent<Props> = ({ context }) => {
  const { t } = useTranslation('internationalisation');

  return (
    <tr>
      <th scope='row'>
        <Markdown>{t('article.negotiation.preference', { context })}</Markdown>
      </th>
      <td>
        <Text is='span'>{t('article.negotiation.result', { context })}</Text>
      </td>
    </tr>
  );
};

export { Example };
