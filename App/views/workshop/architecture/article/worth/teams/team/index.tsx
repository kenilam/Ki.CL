import React from 'react';

// Components
import { Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { TEAMS } from '@/views/workshop/architecture/article/worth/teams/constants';

type Props = { context: (typeof TEAMS)[number] };

const Team: React.FunctionComponent<Props> = ({ context }) => {
  const { t } = useTranslation('architecture');

  return (
    <tr>
      <th scope='row'>
        <Text is='span'>{t('article.worth.team', { context })}</Text>
      </th>
      <td>
        <Text is='span'>{t('article.worth.fit', { context })}</Text>
      </td>
    </tr>
  );
};

export { Team };
