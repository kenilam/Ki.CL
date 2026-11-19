import React from 'react';

// Components
import { Badge, BadgeLabel } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { CLASS_NAME as ROOT } from '@/views/blog/spatial-css/constants';

// Styles
import './styles.scss';

const CLASS_NAME = `${ROOT}__support`;

const Support: React.FunctionComponent = () => {
  const { t } = useTranslation('spatial-css');

  return (
    <>
      <Badge className={`${CLASS_NAME}__off`} level='warning' size='small'>
        <BadgeLabel>{t('article.support.label')}</BadgeLabel>
        {t('article.support.off')}
      </Badge>
      <Badge className={`${CLASS_NAME}__on`} level='confirm' size='small'>
        <BadgeLabel>{t('article.support.label')}</BadgeLabel>
        {t('article.support.on')}
      </Badge>
    </>
  );
};

export { Support };
