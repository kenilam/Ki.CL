import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import {
  Details,
  Heading,
  List,
  ListItem,
  Markdown,
  Table,
  Text,
} from 'design/components';

const MATCHES = ['match_script', 'match_region', 'match_exact'] as const;

const EXAMPLES = ['untranslated', 'incomplete', 'script', 'excluded'] as const;

const Negotiation: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <Details
      gap='narrow'
      summary={
        <Heading dense is='h2' lookLike='h1'>
          {t('article.negotiation.title')}
        </Heading>
      }
    >
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        <Markdown>{t('article.negotiation.header_intro')}</Markdown>
      </Text>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        <Markdown>{t('article.negotiation.header')}</Markdown>
      </Text>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        <Markdown>{t('article.negotiation.entries')}</Markdown>
      </Text>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        <Markdown>{t('article.negotiation.list')}</Markdown>
      </Text>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        <Markdown>{t('article.negotiation.matching')}</Markdown>
      </Text>
      <List
        className='kicl-max-inline-size-columns-8'
        gap='narrower'
        listStyleType='disc'
      >
        {MATCHES.map((match) => {
          return (
            <ListItem key={match}>
              <Text is='span'>
                <Markdown>{t(`article.negotiation.${match}`)}</Markdown>
              </Text>
            </ListItem>
          );
        })}
      </List>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        <Markdown>{t('article.negotiation.complete')}</Markdown>
      </Text>
      <Table className='kicl-max-inline-size-columns-8'>
        <caption>
          <Text is='span'>{t('article.negotiation.examples')}</Text>
        </caption>
        <thead>
          <tr>
            <th scope='col'>
              <Text is='span'>
                {t('article.negotiation.column_preference')}
              </Text>
            </th>
            <th scope='col'>
              <Text is='span'>{t('article.negotiation.column_result')}</Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {EXAMPLES.map((context) => {
            return (
              <tr key={context}>
                <th scope='row'>
                  <Markdown>
                    {t('article.negotiation.preference', { context })}
                  </Markdown>
                </th>
                <td>
                  <Text is='span'>
                    {t('article.negotiation.result', { context })}
                  </Text>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        <Markdown>{t('article.negotiation.note')}</Markdown>
      </Text>
    </Details>
  );
};

export { Negotiation };
