import React from 'react';

// Components
import { Text } from '@/Components';

// Styles
import './Styles.scss';

/**
 * The three numbers the rest of the page is an answer to.
 *
 * They are placed before the essay because every decision downstream — the
 * sampling, the generated plates, the framing of one taxon at a time — follows
 * from the first of them. Read these and the trade-offs are already halfway
 * explained.
 */

const CLASS_NAME = 'kicl--views--experiments--tree-of-life__scale';

const FACTS = [
  { figure: '2,300,000', label: 'tips in the Open Tree of Life' },
  { figure: '15', label: 'whole attempts at drawing it' },
  { figure: '1854', label: 'the plate style every image aims at' },
];

const Scale: React.FunctionComponent = () => {
  return (
    <dl className={CLASS_NAME}>
      {/*
        `dt` and `dd` are written out rather than asked of `Text`, which only
        speaks the prose elements. The term is the number and the description is
        what it counts, which is exactly what a description list is for.
      */}
      {FACTS.map(({ figure, label }) => (
        <div key={figure}>
          <dt>
            <Text
              is='span'
              dense
              unstyled
              className={`${CLASS_NAME}__figure kicl-font-family-mono kicl-font-size-larger`}
            >
              {figure}
            </Text>
          </dt>
          <dd className={`${CLASS_NAME}__label`}>
            <Text is='span' dense unstyled className='kicl-font-size-small'>
              {label}
            </Text>
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default Scale;
