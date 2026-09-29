import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import {
  Button,
  CardContent,
  Layout,
  List,
  ListItem,
  Text,
} from '@/components';

// Icons
import { Ri } from '@/icons';

// Context
import { useHub } from '@/views/experiments/factory-arm/floor/hub';
import {
  type Shape,
  SHAPES,
  shape,
} from '@/views/experiments/factory-arm/floor/hub/obstacles';

// Drag
import { useDrag } from '@/views/experiments/factory-arm/floor/scene/drag';

// Constants
import { COPY } from '@/views/experiments/factory-arm/floor/constants';

/**
 * The obstacles on the floor, each with a button to take it away, and one
 * button per shape that picks a new one up to drag onto the floor.
 */
const Obstacles: React.FunctionComponent = () => {
  const { coming, obstacles, unblock } = useHub();
  const { grab } = useDrag();

  return (
    <CardContent>
      <Layout gap='narrow'>
        <div>
          {obstacles.length === 0 ? (
            <Text
              className={classNames('kicl-color-grey', 'kicl-font-size-small')}
              is='p'
            >
              {COPY.panel.empty}
            </Text>
          ) : (
            <List>
              {obstacles.map((box) => (
                <ListItem key={box.id}>
                  <Layout
                    alignItems='center'
                    autoFlow='column'
                    frames='auto--max-content'
                    gap='narrow'
                  >
                    <div>
                      <Text className='kicl-font-size-small' is='span'>
                        {box.id} · {COPY.panel.shapes[shape(box) ?? 'crate']}
                      </Text>
                      <Button
                        onClick={() => unblock(box.id)}
                        size='small'
                        variant='ghost'
                      >
                        <Ri.RiCloseLine aria-hidden />
                        <span className='kicl-hidden'>{COPY.panel.remove}</span>
                      </Button>
                    </div>
                  </Layout>
                </ListItem>
              ))}
            </List>
          )}

          <Layout autoFlow='column' gap='narrow' justifyContent='start'>
            <div>
              {(Object.keys(SHAPES) as Shape[]).map((each) => (
                <Button
                  key={each}
                  onClick={() => grab('obstacle', coming.obstacle, true, each)}
                  size='small'
                  variant='secondary'
                >
                  <Ri.RiAddLine aria-hidden />
                  {COPY.panel.shapes[each]}
                </Button>
              ))}
            </div>
          </Layout>
        </div>
      </Layout>
    </CardContent>
  );
};

export { Obstacles };
