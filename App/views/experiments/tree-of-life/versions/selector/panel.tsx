import React from 'react';

// Components
import { Card, HyperLink, Layout } from '@/components';

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
    <dialog
      className={`${CLASS_NAME} kicl-inset-block-end-narrow`}
      id={CLASS_NAME}
      popover='auto'
    >
      <Card variant='ghost'>
        <Layout
          autoFlow='row'
          justifyContent='stretch'
          justifyItems='center'
          gap='narrower'
        >
          {/*
            Every entry names a version, the current one included. The
            separate "Final" link pointed at an unversioned node path, which
            no longer exists - and said nothing the list does not.
          */}
          <nav>
            {[...VERSIONS].reverse().map((version) => (
              <HyperLink
                unstyled
                key={version}
                to={toVersionPath({ version, nodeId })}
              >
                {version}
              </HyperLink>
            ))}
          </nav>
        </Layout>
      </Card>
    </dialog>
  );
};

export { Panel };
