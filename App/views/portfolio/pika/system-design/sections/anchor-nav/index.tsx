import React, { useEffect, useState } from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { Layout, Navigation } from 'design/components';

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

const SECTIONS = [
  { context: 'walkthrough', id: SECTION_ID.walkthrough },
  { context: 'part_one', id: SECTION_ID.partOne },
  { context: 'watch_it_run', id: SECTION_ID.watchItRun },
  { context: 'part_two', id: SECTION_ID.partTwo },
  { context: 'watch_the_agent_work', id: SECTION_ID.watchTheAgentWork },
  { context: 'estimate', id: SECTION_ID.estimate },
] as const;

const AnchorNav: React.FunctionComponent = () => {
  const { t } = useTranslation('pika');

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
          aria-label={t('sections')}
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
          {SECTIONS.map(({ context, id }) => (
            <Item id={id} key={id} label={t('section', { context })} />
          ))}
        </Navigation>
      </Layout>
    </AnchorNavContext.Provider>
  );
};

export { AnchorNav, CLASS_NAME };
