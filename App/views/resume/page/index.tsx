import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Animation, Frame, Layout, ScrollIndicator } from 'design/components';

// Widgets
import { Background } from 'design/widgets';

// Views
import { CONTENT_DELAY } from '@/views/constants';

// Content
import { MASTER } from '@/views/resume/content';

// Context
import { useVersion } from '@/views/resume/context';

// Hooks
import { usePrintTitle } from '@/views/resume/use-print-title';

// Partials
import { Article } from './article';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME } from '@/views/resume/constants';

/**
 * A card in the home page's frame, over its light. The card is the article
 * itself. On paper there is no card and no light, only the frame's rounded
 * border on every sheet.
 */
const Page: React.FunctionComponent = () => {
  const version = useVersion();

  usePrintTitle();

  return (
    <>
      {/* The tailored versions are for the people they are sent to. */}
      {version.slug !== MASTER.slug ? (
        <meta content='noindex' name='robots' />
      ) : null}
      {/* Outside the frame and the card: the card's blur would hold a fixed element to itself. */}
      <ScrollIndicator />
      <Layout autoFlow='row' justifyContent='center' justifyItems='center'>
        {/* Grows with the page, which is longer than any window. */}
        <Frame grow>
          {/* The box the light fills. */}
          <div
            className={classNames(
              `${CLASS_NAME}__frame`,
              'kicl-position-relative'
            )}
          >
            <Animation delay={CONTENT_DELAY}>
              <Background className='kicl-print-hidden' />
            </Animation>
            <Article />
          </div>
        </Frame>
      </Layout>
    </>
  );
};

export { Page };
