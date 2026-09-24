import React from 'react';

// Components
import { Layout, Text } from '@/components';

// Spec
import type { LegendItem } from './spec';
import classNames from 'classnames';

type Props = {
  items: LegendItem[];
};

/**
 * What the colours and line styles in a diagram mean: one outlined chip per
 * item, the key filled in the item's accent and the meaning beside it.
 */
const Legend: React.FunctionComponent<Props> = ({ items }) => (
  <Layout display='flex' gap='narrow' wrap>
    <Text>
      {items.map(({ accent, label, value }) => (
        <Layout
          alignContent='center'
          alignItems='center'
          autoFlow='column'
          display='inline-grid'
          gap='narrow'
          justifyContent='center'
          justifyItems='center'
          key={label}
        >
          <Text
            accent={accent}
            className={classNames(
              'kicl-border-radius-sm',
              'kicl-padding-inline-end-narrow'
            )}
            is='code'
            variant='secondary'
          >
            <Text
              accent={accent}
              className={classNames(
                'kicl-line-height-narrower',
                'kicl-padding-inline-narrower'
              )}
              is='code'
            >
              {label}
            </Text>
            <Text is='span' dense className='kicl-line-height-narrower'>
              {value}
            </Text>
          </Text>
        </Layout>
      ))}
    </Text>
  </Layout>
);

export { Legend };
