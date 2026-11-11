import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { HyperLink, ListItem, Text } from 'design/components';

// Hooks
import { useResponsive, useTranslation } from 'design/hooks';

// Content
import { MASTER, fingerprint } from '@/views/resume/content';
import EXPORTED from '@/views/resume/exported.json';

// Context
import { useVersion } from '@/views/resume/context';

// Constants
import { FILE } from '@/views/resume/constants';

/**
 * The file is the master's, and it is offered only while it was made from
 * the content on the page: after an edit it is out of date until the next
 * export, and print still gives the current page.
 */
const File: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');
  const { isNarrow } = useResponsive();
  const version = useVersion();

  const current =
    version.slug === MASTER.slug &&
    EXPORTED.fingerprint === fingerprint(version);

  if (!current) {
    return null;
  }

  const text = t('action', { context: 'file' });

  return (
    <ListItem>
      <HyperLink
        before={<Tb.TbDownload aria-hidden />}
        data-track='Resume PDF'
        download
        lookLikeButton
        reloadDocument
        size='small'
        to={FILE}
        variant='secondary'
      >
        {isNarrow ? (
          <Text className='kicl-hidden' is='span'>
            {text}
          </Text>
        ) : (
          text
        )}
      </HyperLink>
    </ListItem>
  );
};

export { File };
