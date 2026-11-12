import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Card, Layout, Text } from 'design/components';

// Views
import { LanguageSelect } from '@/views/language-select';

// Hooks
import { useTranslation } from 'design/hooks';
import { usePreview } from './use-preview';

const Switcher: React.FunctionComponent = () => {
  const { i18n, t } = useTranslation('internationalisation');
  const { choose, preview, value } = usePreview();

  return (
    <Layout justifyItems='start'>
      <figure>
        <Layout gap='narrow' justifyItems='start'>
          <Card
            className={classNames(
              'kicl-inline-size-full',
              'kicl-max-inline-size-columns-8'
            )}
            is='section'
            variant='secondary'
          >
            <Layout
              alignItems='center'
              autoFlow='column'
              gap='narrow'
              justifyContent='start'
            >
              <Text is='p'>
                <LanguageSelect
                  onValueChange={choose}
                  value={value ?? i18n.language}
                />
                <output lang={preview?.contentLanguage ?? i18n.language}>
                  {preview?.text ?? t('article.switcher_preview')}
                </output>
              </Text>
            </Layout>
          </Card>
        </Layout>
        <figcaption className='kicl-max-inline-size-columns-8'>
          <Text dense is='span'>
            {t('article.switcher_caption')}
          </Text>
        </figcaption>
      </figure>
    </Layout>
  );
};

export { Switcher };
