import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Icons
import * as Ri from 'react-icons/ri';

// Components
import { Button, HyperLink, List, ListItem, Text } from 'design/components';

// Hooks
import { useResponsive } from 'design/hooks';

// Content
import { MASTER, fingerprint } from '@/views/resume/content';
import EXPORTED from '@/views/resume/content/exported.json';

// Context
import { useVersion } from '@/views/resume/context';

// Constants
import { FILE } from '@/views/resume/constants';
import { CONTACT_ID } from '@/views/contact/constants';

const print = () => {
  window.print();
};

/**
 * The file and the print dialog. The file is the master's, and it is offered
 * only while it was made from the content on the page: after an edit it is
 * out of date until the next export, and print still gives the current page.
 * Neither control belongs on paper.
 */
const Actions: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');
  const { t: common } = useTranslation();

  const version = useVersion();
  const { isMobile } = useResponsive();

  const label = (text: string) => {
    return isMobile ? (
      <Text className='kicl-hidden' is='span'>
        {text}
      </Text>
    ) : (
      text
    );
  };

  const current =
    version.slug === MASTER.slug &&
    EXPORTED.fingerprint === fingerprint(version);

  return (
    <List
      alignItems='center'
      autoFlow='column'
      className='kicl-print-hidden'
      gap='narrow'
      justifyContent='start'
      justifyItems='start'
    >
      <ListItem>
        <Button
          before={<Ri.RiMessageLine aria-hidden />}
          command='show-modal'
          commandfor={CONTACT_ID}
          data-track='Resume message'
          level='confirm'
          size='small'
          variant='ghost'
        >
          {label(t('action', { context: 'message' }))}
        </Button>
      </ListItem>
      {current ? (
        <ListItem>
          <HyperLink
            before={<Ri.RiDownload2Line aria-hidden />}
            data-track='Resume PDF'
            download
            level='confirm'
            lookLikeButton
            reloadDocument
            size='small'
            to={FILE}
            variant='secondary'
          >
            {label(t('action', { context: 'file' }))}
          </HyperLink>
        </ListItem>
      ) : null}
      <ListItem>
        <Button
          before={<Ri.RiPrinterLine aria-hidden />}
          data-track='Resume print'
          level='confirm'
          onClick={print}
          size='small'
          variant='secondary'
        >
          {label(common('action', { context: 'print' }))}
        </Button>
      </ListItem>
    </List>
  );
};

export { Actions };
