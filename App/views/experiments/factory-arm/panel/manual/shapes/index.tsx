import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import {
  Button,
  Heading,
  Layout,
  List,
  ListItem,
  Text,
} from 'design/components';

// Context
import { useSetup } from '@/views/experiments/factory-arm/setup';

// Obstacles
import {
  SHAPES,
  SHAPE_TYPE,
  type Shape,
} from '@/views/experiments/factory-arm/scene/obstacles/constants';

// Constants
import { COPY } from '@/views/experiments/factory-arm/constants';

const NAMES = Object.keys(SHAPES) as Shape[];

/** Its size in a line, width by height by depth in metres. */
const measure = (shape: Shape) => `${SHAPES[shape].size.join(' × ')} m`;

/**
 * The obstacle shapes. Drag one onto the stage to put it there, or click it
 * to put it in front by the belt; either way it goes where there is room.
 */
const Shapes: React.FunctionComponent = () => {
  const { cell } = useSetup();

  return (
    <Layout gap='narrow'>
      <section aria-labelledby='factory-arm-shapes'>
        <Heading dense id='factory-arm-shapes' is='h2' lookLike='h5'>
          {COPY.panel.shapes.title}
        </Heading>
        <Text
          className={classNames('kicl-color-grey-dark', 'kicl-font-size-small')}
          is='p'
        >
          {COPY.panel.shapes.hint}
        </Text>

        <List gap='narrower'>
          {NAMES.map((shape) => (
            <ListItem key={shape}>
              <Button
                className='kicl-inline-size-full'
                draggable
                justifyContent='space-between'
                onClick={() => cell.current?.ask(shape)}
                onDragStart={(event) => {
                  event.dataTransfer.setData(SHAPE_TYPE, shape);
                  event.dataTransfer.effectAllowed = 'copy';
                }}
                size='small'
                variant='secondary'
              >
                {COPY.panel.shapes[shape]}
                <span
                  className={classNames(
                    'kicl-font-family-mono',
                    'kicl-font-size-smaller',
                    'kicl-color-grey'
                  )}
                >
                  {measure(shape)}
                </span>
              </Button>
            </ListItem>
          ))}
        </List>
      </section>
    </Layout>
  );
};

export { Shapes };
