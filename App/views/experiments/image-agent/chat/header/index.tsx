import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Icons
import * as Ri from 'react-icons/ri';

// Components
import { HyperLink, Layout } from 'design/components';

// Constants
import { toPath } from '@/views/experiments/image-agent/constants';
import { CLASS_NAME as CHAT } from '@/views/experiments/image-agent/chat/constants';

const CLASS_NAME = `${CHAT}__header`;

/** Stuck to the top of the conversation: the way back to the start page. */
const Header: React.FunctionComponent = () => {
  const { t: common } = useTranslation();

  return (
    <Layout autoFlow='row' gap='narrow'>
      <header
        className={classNames(
          CLASS_NAME,
          'kicl-backdrop',
          'kicl-border-radius-md',
          'kicl-inset-block-start',
          'kicl-position-sticky',
          'kicl-padding-block-narrow',
          'kicl-padding-inline-narrow',
          'kicl-z-index-floating'
        )}
      >
        <HyperLink
          before={
            <Ri.RiArrowLeftSFill aria-hidden className='kicl-rtl-mirror' />
          }
          end
          lookLikeButton
          to={toPath()}
          variant='secondary'
          size='small'
        >
          {common('action', { context: 'go_back' })}
        </HyperLink>
      </header>
    </Layout>
  );
};

export { Header };
