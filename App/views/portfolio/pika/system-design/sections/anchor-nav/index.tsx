import React, { useEffect, useState } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout, Navigation } from '@/components';

// Styles
import './styles.scss';

// Context
import { AnchorNavContext } from './context';

// Partials
import { Item } from './item';

// Constants
import {
  CLASS_NAME as DEFAULT_CLASS_NAME,
  SECTION_ID,
} from '@/views/portfolio/pika/system-design/constants';

const CLASS_NAME = `${DEFAULT_CLASS_NAME}__anchor-nav`;

const COPY = {
  label: 'Sections',
};

const SECTIONS = [
  { id: SECTION_ID.walkthrough, label: 'Walkthrough' },
  { id: SECTION_ID.partOne, label: 'Part 1 — The App platform' },
  { id: SECTION_ID.watchItRun, label: 'Watch it run' },
  { id: SECTION_ID.partTwo, label: 'Part 2 — The agent experience' },
  { id: SECTION_ID.watchTheAgentWork, label: 'Watch the agent work' },
  { id: SECTION_ID.estimate, label: 'Estimate & build plan' },
];

const AnchorNav: React.FunctionComponent = () => {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  /* The links scroll natively; this only tracks which heading is in the top half. */
  useEffect(() => {
    const headings = SECTIONS.map(({ id }) =>
      document.getElementById(id)
    ).filter((heading): heading is HTMLElement => Boolean(heading));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -50% 0px' }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  return (
    <AnchorNavContext.Provider value={{ active }}>
      <Layout alignContent='center'>
        <Navigation
          aria-label={COPY.label}
          className={classNames(
            CLASS_NAME,
            'kicl-position-fixed',
            'kicl-inset-block-end-0',
            'kicl-inset-block-start-0',
            'kicl-inset-inline-end-wide',
            'kicl-z-index-overlay'
          )}
          gap='narrow'
          justifyItems='end'
        >
          {SECTIONS.map(({ id, label }) => (
            <Item id={id} key={id} label={label} />
          ))}
        </Navigation>
      </Layout>
    </AnchorNavContext.Provider>
  );
};

export { AnchorNav, CLASS_NAME };
