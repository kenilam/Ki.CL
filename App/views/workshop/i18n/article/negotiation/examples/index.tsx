import React from 'react';

// Components
import { Table, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Example } from './example';

// Constants
import { EXAMPLES } from './constants';

const Examples: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <Table>
      <caption>
        <Text is='span'>{t('article.negotiation.examples')}</Text>
      </caption>
      <thead>
        <tr>
          <th scope='col'>
            <Text is='span'>{t('article.negotiation.column_preference')}</Text>
          </th>
          <th scope='col'>
            <Text is='span'>{t('article.negotiation.column_result')}</Text>
          </th>
        </tr>
      </thead>
      <tbody>
        {EXAMPLES.map((context) => {
          return <Example context={context} key={context} />;
        })}
      </tbody>
    </Table>
  );
};

export { Examples };
