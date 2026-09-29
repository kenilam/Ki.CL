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
import { shape } from '@/views/experiments/factory-arm/floor/hub/obstacles';

// Constants
import { COPY } from '@/views/experiments/factory-arm/floor/constants';

/** The obstacles on the floor, each with a button to take it away. New ones come from the Obstacles tab. */
const Obstacles: React.FunctionComponent = () => {
  const { obstacles, unblock } = useHub();

  return (
    <CardContent>
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
    </CardContent>
  );
};

export { Obstacles };
