import React from 'react';

import * as Tb from 'react-icons/tb';

import { HyperLink, ListItem } from 'design/components';
import { useTranslation } from 'design/hooks';

import { PAGES } from '@/views/routes';

const View: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');

  return (
    <ListItem>
      <HyperLink
        before={<Tb.TbWorld aria-hidden />}
        className='kicl-inline-size-full'
        data-track='Resume view'
        justifyContent='center'
        lookLikeButton
        size='large'
        to={PAGES.resume}
      >
        {t('action', { context: 'view' })}
      </HyperLink>
    </ListItem>
  );
};

export { View };
