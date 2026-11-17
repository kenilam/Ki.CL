import React, { useMemo } from 'react';

import classNames from 'classnames';

import { PageIndicator } from 'design/components';
import { useTranslation } from 'design/hooks';

import { useInverse } from '@/views/use-inverse';

import { toAnchor } from '@/views/about/resume/constants';
import { useVersion } from '@/views/about/resume/context';

import { useCurrent } from './use-current';

/**
 * A dot for each section from the experience on. It fills the element that
 * wraps those sections, so it arrives with the experience and leaves with the
 * last section, as the footer comes in. Over the sections, which are in the
 * other theme, it takes their theme so the dots stay readable.
 */
const Pages: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');
  const { order } = useVersion();

  const sections = useMemo(() => {
    return ['experience', ...order] as const;
  }, [order]);
  const anchors = useMemo(() => {
    return sections.map(toAnchor);
  }, [sections]);
  const current = useCurrent(anchors);
  const inverse = useInverse();

  return (
    <PageIndicator
      aria-label={t('title', { context: 'sections' })}
      className={classNames(
        'kicl-print-hidden',
        current === toAnchor('experience') ? undefined : inverse
      )}
      current={current}
      pages={sections.map((section) => {
        return {
          id: toAnchor(section),
          label: t('title', { context: section }),
        };
      })}
      sticky
    />
  );
};

export { Pages };
