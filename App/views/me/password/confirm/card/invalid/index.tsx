import React from 'react';

// Components
import { Card, CardFooter, HyperLink, Status } from 'design/components';

// Views
import { PAGES } from '@/views/routes';

// Hooks
import { useTranslation } from 'design/hooks';

const Invalid: React.FunctionComponent = () => {
  const { t } = useTranslation('me');

  return (
    <Card is='section' size='max' variant='secondary'>
      <Status
        justifyContent='center'
        headingLevel='h1'
        in
        level='warning'
        message={t('description', { context: 'invalid' })}
        title={t('title', { context: 'invalid' })}
      />
      <CardFooter justifyContent='center'>
        <HyperLink
          lookLikeButton
          size='small'
          to={PAGES.home}
          variant='secondary'
        >
          {t('action', { context: 'home' })}
        </HyperLink>
      </CardFooter>
    </Card>
  );
};

export { Invalid };
