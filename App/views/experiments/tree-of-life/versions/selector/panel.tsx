import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Card, HyperLink, List, ListItem } from '@/components';

// Context
import { useTreeOfLifeContext } from '@/views/experiments/tree-of-life/context';

// Constants
import {
  VERSIONS,
  toVersionPath,
} from '@/views/experiments/tree-of-life/versions/constants';
import { CLASS_NAME } from '@/views/experiments/tree-of-life/versions/selector/constants';

const Panel: React.FunctionComponent = () => {
  const { focus: nodeId } = useTreeOfLifeContext();

  return (
    <nav
      aria-label='Versions'
      className={classNames(
        CLASS_NAME,
        'kicl-inset-block-end-narrow',
        'kicl-overflow-y-auto'
      )}
      id={CLASS_NAME}
      popover='auto'
    >
      <Card variant='ghost'>
        {/*
          Every entry names a version, the current one included. The separate
          "Final" link pointed at an unversioned node path, which no longer
          exists - and said nothing the list does not.
        */}
        <List justifyContent='stretch' justifyItems='center' gap='narrower'>
          {[...VERSIONS].reverse().map((version) => (
            <ListItem key={version}>
              <HyperLink unstyled to={toVersionPath({ version, nodeId })}>
                {version}
              </HyperLink>
            </ListItem>
          ))}
        </List>
      </Card>
    </nav>
  );
};

export { Panel };
