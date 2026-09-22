import React, { useId } from 'react';

// Library
import classNames from 'classnames';

// Components
import { HyperLink, List, ListItem, Text } from '@/components';

// Constants
import { ROOT_NODE_ID } from '@/views/experiments/tree-of-life/constants';
import { toVersionPath } from '@/views/experiments/tree-of-life/versions/constants';
import { type Era as Props } from './constants';

// The label comes first so a screen reader hears what the numbers are before them.
const Era: React.FunctionComponent<Props> = ({ label, versions }) => {
  const id = useId();

  return (
    <ListItem gap='none'>
      <Text id={id} dense className='kicl-font-size-small'>
        {label}
      </Text>
      <List
        is='ol'
        aria-labelledby={id}
        autoFlow='column'
        justifyContent='start'
        gap='narrow'
      >
        {versions.map((version) => (
          <ListItem key={version}>
            <HyperLink
              className={classNames(
                'kicl-font-family-mono',
                'kicl-font-size-medium'
              )}
              to={toVersionPath({ version, nodeId: ROOT_NODE_ID })}
            >
              {version.padStart(2, '0')}
            </HyperLink>
          </ListItem>
        ))}
      </List>
    </ListItem>
  );
};

export { Era };
