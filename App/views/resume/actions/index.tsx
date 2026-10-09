import React from 'react';

// Icons
import * as Ri from 'react-icons/ri';

// Components
import { Button, HyperLink, List, ListItem } from 'design/components';

// Content
import { MASTER, fingerprint } from '@/views/resume/content';
import EXPORTED from '@/views/resume/content/exported.json';

// Context
import { useVersion } from '@/views/resume/context';

// Constants
import { COPY, FILE } from '@/views/resume/constants';
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
  const version = useVersion();

  const current =
    version === MASTER && EXPORTED.fingerprint === fingerprint(MASTER);

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
          className='kicl-print-hidden'
          command='show-modal'
          commandFor={CONTACT_ID}
          level='confirm'
          size='small'
          variant='ghost'
        >
          {COPY.sendMessage}
        </Button>
      </ListItem>
      {current && (
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
            {COPY.file}
          </HyperLink>
        </ListItem>
      )}
      <ListItem>
        <Button
          before={<Ri.RiPrinterLine aria-hidden />}
          data-track='Resume print'
          level='confirm'
          onClick={print}
          size='small'
          variant='secondary'
        >
          {COPY.print}
        </Button>
      </ListItem>
    </List>
  );
};

export { Actions };
