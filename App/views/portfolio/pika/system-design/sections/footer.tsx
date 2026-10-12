import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { Layout, Separator, Text } from 'design/components';

const Footer: React.FunctionComponent = () => {
  const { t } = useTranslation('pika');

  return (
    <Layout
      alignContent='center'
      alignItems='center'
      justifyContent='stretch'
      justifyItems='center'
    >
      <footer>
        <Separator />
        <Layout
          alignContent='center'
          alignItems='center'
          justifyContent='center'
          justifyItems='center'
        >
          <Text
            className={classNames(
              'kicl-font-style-italic',
              'kicl-padding-block-wider'
            )}
          >
            {t('footer')}
          </Text>
        </Layout>
        <Separator />
        <Text
          className={classNames(
            'kicl-font-size-small',
            'kicl-letter-spacing',
            'kicl-text-align-center',
            'kicl-text-transform-uppercase'
          )}
          dense
          variant='secondary'
        >
          {t('byline')}
          <time dateTime='2026-08'>{t('date')}</time>
        </Text>
      </footer>
    </Layout>
  );
};

export { Footer };
