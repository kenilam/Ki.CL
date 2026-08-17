import React, { useCallback, useEffect, useState } from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import { Ri } from '@/Icons';

// Components
import { Badge, Button, Layout, Navigation } from '@/Components';

// Constants
import { CLASS_NAME as DEFAULT_CLASS_NAME } from '@/Views/Portfolio/Pika/SystemDesign/constants';

const CLASS_NAME = `${DEFAULT_CLASS_NAME}__anchor-nav`;

/**
 * Section anchors, matched against the page's h3 headings by prefix. The
 * matched heading receives the id, so plain URL hashes work too.
 */
const SECTIONS = [
  { id: 'walkthrough', label: 'Walkthrough', match: 'Walkthrough' },
  { id: 'part-1', label: 'Part 1 — The App platform', match: 'Part 1' },
  { id: 'watch-it-run', label: 'Watch it run', match: 'Watch it run' },
  { id: 'part-2', label: 'Part 2 — The agent experience', match: 'Part 2' },
  {
    id: 'watch-the-agent-work',
    label: 'Watch the agent work',
    match: 'Watch the agent',
  },
  { id: 'estimate', label: 'Estimate & build plan', match: 'Estimate' },
];

const AnchorNav: React.FunctionComponent = () => {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('h3'));

    const targets = SECTIONS.map((section) => {
      const heading = headings.find((h) =>
        (h.textContent || '').trim().startsWith(section.match)
      );

      if (heading) {
        heading.id = section.id;
      }

      return { heading, id: section.id };
    }).filter((t): t is { heading: HTMLHeadingElement; id: string } =>
      Boolean(t.heading)
    );

    if (targets.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -70% 0px' }
    );

    targets.forEach(({ heading }) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  const go = useCallback((id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  return (
    <Navigation
      className={classNames(
        CLASS_NAME,
        'kicl-position-fixed',
        'kicl-inset-block-end-0',
        'kicl-inset-block-start-0',
        'kicl-inset-inline-end-wide'
      )}
    >
      <Layout gap='narrow' alignContent='center' justifyItems='end'>
        <ul>
          {SECTIONS.map(({ id, label }) => (
            <Layout
              alignContent='center'
              alignItems='center'
              autoFlow='column'
              gap='narrow'
              justifyContent='start'
              key={id}
            >
              <li>
                <Badge
                  className={classNames('kicl-font-size-small')}
                  size='small'
                >
                  {label}
                </Badge>
                <Button
                  aria-current={active === id ? 'true' : undefined}
                  aria-label={label}
                  className={classNames(
                    'kicl-font-size-smaller',
                    'kicl-position-relative'
                  )}
                  onClick={() => go(id)}
                  type='button'
                  unstyled
                >
                  {active === id ? (
                    <Ri.RiCheckboxBlankCircleFill aria-hidden />
                  ) : (
                    <Ri.RiCheckboxBlankCircleLine aria-hidden />
                  )}
                </Button>
              </li>
            </Layout>
          ))}
        </ul>
      </Layout>
    </Navigation>
  );
};

export default AnchorNav;
