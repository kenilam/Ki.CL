import React from 'react';

// Components
import { Table, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Team } from './team';

// Constants
import { TEAMS } from './constants';

const Teams: React.FunctionComponent = () => {
  const { t } = useTranslation('architecture');

  return (
    <Table>
      <caption>
        <Text is='span'>{t('article.worth.table')}</Text>
      </caption>
      <thead>
        <tr>
          <th scope='col'>
            <Text is='span'>{t('article.worth.column_team')}</Text>
          </th>
          <th scope='col'>
            <Text is='span'>{t('article.worth.column_fit')}</Text>
          </th>
        </tr>
      </thead>
      <tbody>
        {TEAMS.map((context) => {
          return <Team context={context} key={context} />;
        })}
      </tbody>
    </Table>
  );
};

export { Teams };
