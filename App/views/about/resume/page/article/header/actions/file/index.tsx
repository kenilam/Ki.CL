import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { HyperLink, ListItem } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Content
import { MASTER, fingerprint } from '@/views/about/resume/content';
import EXPORTED from '@/views/about/resume/exported.json';

// Context
import { useVersion } from '@/views/about/resume/context';

// Constants
import { FILE } from '@/views/about/resume/constants';

/**
 * The file is the master's, and it is offered only while it was made from
 * the content on the page: after an edit it is out of date until the next
 * export, and print still gives the current page.
 */
const File: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');
  const version = useVersion();

  const current =
    version.slug === MASTER.slug &&
    EXPORTED.fingerprint === fingerprint(version);

  if (!current) {
    return null;
  }

  return (
    <ListItem>
      <HyperLink
        before={<Tb.TbDownload aria-hidden />}
        data-track='Resume PDF'
        download
        iconOnlyUpTo='narrow'
        lookLikeButton
        reloadDocument
        size='small'
        to={FILE}
        variant='secondary'
      >
        {t('action', { context: 'file' })}
      </HyperLink>
    </ListItem>
  );
};

export { File };
