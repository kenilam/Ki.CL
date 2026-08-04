import React from 'react';

// Components
import { Badge, Button, Card, HyperLink, Layout, Text } from '@/Components';

// Icons
import { Ri } from '@/Icons';

// Context
import { useTreeOfLifeContext } from '@/Views/Experiments/TreeOfLife/Context';

// Constants
import {
  ARCHIVE,
  toArchivePath,
} from '@/Views/Experiments/TreeOfLife/constants';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--views--experiments--tree-of-life--v15--archive';

const Archive: React.FunctionComponent = () => {
  const { focus: nodeId } = useTreeOfLifeContext();

  return (
    <>
      <Layout
        className='kicl-position-fixed kicl-inset-block-end kicl-inset-inline-end'
        alignItems='center'
        autoFlow='column'
        justifyContent='end'
        gap='narrower'
      >
        <Button
          unstyled
          type='button'
          alignItems='center'
          gap='narrower'
          className={`${CLASS_NAME}__toggle`}
          popoverTarget={CLASS_NAME}
          aria-label='Earlier versions of this view'
          title='Show the earlier versions of this view'
        >
          <Ri.RiStackLine aria-hidden />
          <Text is='span' dense unstyled className='kicl-font-size-small'>
            archive
          </Text>
        </Button>
      </Layout>

      <dialog
        className={`${CLASS_NAME} kicl-inset-block-end-narrow`}
        id={CLASS_NAME}
        popover='auto'
      >
        <Card>
          <Layout
            autoFlow='row'
            justifyContent='stretch'
            justifyItems='center'
            gap='narrower'
          >
            <nav>
              <HyperLink unstyled to={toArchivePath({ nodeId })}>
                <Badge is='span' variant='ghost'>
                  Final
                </Badge>
              </HyperLink>
              {[...ARCHIVE].reverse().map((version) => (
                <HyperLink
                  unstyled
                  key={version}
                  to={toArchivePath({ version, nodeId })}
                >
                  <Badge is='span' variant='ghost'>
                    {version}
                  </Badge>
                </HyperLink>
              ))}
            </nav>
          </Layout>
        </Card>
      </dialog>
    </>
  );
};

export default Archive;
