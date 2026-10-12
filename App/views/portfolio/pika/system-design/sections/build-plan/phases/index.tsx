import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as SYSTEM_DESIGN } from '@/views/portfolio/pika/system-design/constants';

const CLASS_NAME = `${SYSTEM_DESIGN}__phases`;

/** Header and body cells share one padding so the columns line up. */
const CELL_CLASS_NAME = classNames(
  'kicl-padding-block-narrow',
  'kicl-padding-inline-narrower'
);

const TH_CLASS_NAME = classNames(
  'kicl-font-size-small',
  'kicl-letter-spacing',
  'kicl-text-align-start',
  'kicl-text-transform-uppercase'
);

const PHASES = [
  { context: 'skeleton', phase: 1, weeks: '2' },
  { context: 'hardening', phase: 2, weeks: '2' },
  { context: 'video', phase: 3, weeks: '2_to_3' },
  { context: 'agent', phase: 4, weeks: '2_to_3' },
  { context: 'eval', phase: 5, weeks: '1_to_2' },
] as const;

const Phases: React.FunctionComponent = () => {
  const { t } = useTranslation('pika');

  return (
    <table className={classNames(CLASS_NAME, 'kicl-inline-size-full')}>
      <caption className='kicl-hidden'>
        {t('build_plan.phases.caption')}
      </caption>
      <thead>
        <tr>
          <th
            className={classNames(CELL_CLASS_NAME, TH_CLASS_NAME)}
            scope='col'
          >
            {t('label', { context: 'phase' })}
          </th>
          <th
            className={classNames(CELL_CLASS_NAME, TH_CLASS_NAME)}
            scope='col'
          >
            {t('label', { context: 'scope' })}
          </th>
          <th
            className={classNames(CELL_CLASS_NAME, TH_CLASS_NAME)}
            scope='col'
          >
            {t('label', { context: 'time' })}
          </th>
        </tr>
      </thead>
      <tbody>
        {PHASES.map(({ context, phase, weeks }) => (
          <tr key={phase}>
            <th
              className={classNames(
                CELL_CLASS_NAME,
                'kicl-font-weight',
                'kicl-text-align-start'
              )}
              scope='row'
            >
              {phase}
            </th>
            <td className={CELL_CLASS_NAME}>
              {t('build_plan.phases.scope', { context })}
            </td>
            <td className={classNames(CELL_CLASS_NAME, 'kicl-text-nowrap')}>
              {t('build_plan.phases.weeks', { context: weeks })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { CLASS_NAME, Phases };
