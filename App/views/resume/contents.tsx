import React from 'react';

// Libraries
import classNames from 'classnames';

// Routes
import { useParams } from 'design/router';

// Status
import { Status404 } from 'design/status';

// Components
import {
  Animation,
  Card,
  Frame,
  Layout,
  ScrollIndicator,
} from 'design/components';

// Widgets
import { Background } from 'design/widgets';

// Views
import { CONTENT_DELAY, FRAME_DELAY } from '@/views/home/constants';

// Content
import { MASTER, NAME, findVersion, type SectionId } from './content';

// Context
import { VersionProvider } from './context';

// Hooks
import { usePrintTitle } from './use-print-title';

// Partials
import { Education } from './education';
import { Experience } from './experience';
import { Header } from './header';
import { Languages } from './languages';
import { Mentoring } from './mentoring';
import { Projects } from './projects';
import { Skills } from './skills';
import { Summary } from './summary';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME, COPY } from './constants';

const SECTIONS: Record<SectionId, React.FunctionComponent> = {
  education: Education,
  experience: Experience,
  languages: Languages,
  mentoring: Mentoring,
  projects: Projects,
  skills: Skills,
  summary: Summary,
};

/**
 * One version of the resume, as a page and as the document it prints to: a
 * card in the home page's frame, over its light. The card is the article
 * itself. On paper there is no card and no light, only the frame's rounded
 * border on every sheet.
 */
const Resume: React.FunctionComponent = () => {
  const { version: slug } = useParams();

  const version = findVersion(slug);

  usePrintTitle(`${NAME} - ${COPY.title}`);

  if (!version) {
    return <Status404 />;
  }

  return (
    <VersionProvider version={version}>
      {/* The tailored versions are for the people they are sent to. */}
      {version !== MASTER && <meta content='noindex' name='robots' />}
      <Layout autoFlow='row' justifyContent='center' justifyItems='center'>
        {/* Grows with the page, which is longer than any window. */}
        <Frame delay={FRAME_DELAY} grow>
          {/* The box the light fills, with the frame's inset around the card. */}
          <div
            className={classNames(
              'kicl-padding-block-frame',
              'kicl-padding-inline-frame',
              'kicl-position-relative'
            )}
          >
            <Animation delay={CONTENT_DELAY}>
              <Background className='kicl-print-hidden' />
            </Animation>
            {/* Beside the card, not in it: the card's blur would hold a fixed element to itself. */}
            <ScrollIndicator />
            <Card
              className={classNames(CLASS_NAME, 'kicl-margin-inline-auto')}
              data-version={version.slug}
              gap='wide'
              is='article'
              variant='ghost'
            >
              <Header />
              {version.order.map((id) => {
                const Section = SECTIONS[id];

                return <Section key={id} />;
              })}
            </Card>
          </div>
        </Frame>
      </Layout>
    </VersionProvider>
  );
};

export { Resume };
