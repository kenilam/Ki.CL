import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

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

const NAMES = Object.keys(SHAPES) as Shape[];

/**
 * The obstacle shapes. Drag one onto the stage to put it there, or click it
 * to put it in front by the belt; either way it goes where there is room.
 */
const Shapes: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');
  const { cell } = useSetup();

  return (
    <Layout gap='narrow'>
      <section aria-labelledby='factory-arm-shapes'>
        <Heading dense id='factory-arm-shapes' is='h2' lookLike='h5'>
          {t('title', { context: 'obstacles' })}
        </Heading>
        <Text
          className={classNames('kicl-color-grey-dark', 'kicl-font-size-small')}
          is='p'
        >
          {t('hint')}
        </Text>

        <List gap='narrower'>
          {NAMES.map((shape) => {
            const [width, height, depth] = SHAPES[shape].size;

            return (
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
                  {t('shape', { context: shape })}
                  <span
                    className={classNames(
                      'kicl-font-family-mono',
                      'kicl-font-size-smaller',
                      'kicl-color-grey'
                    )}
                  >
                    {t('size', { depth, height, width })}
                  </span>
                </Button>
              </ListItem>
            );
          })}
        </List>
      </section>
    </Layout>
  );
};

export { Shapes };
