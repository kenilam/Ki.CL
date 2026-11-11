import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Button, ListItem, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useCellContext } from '@/views/experiments/factory-arm/cell-context';

// Obstacles
import {
  SHAPES,
  SHAPE_TYPE,
} from '@/views/experiments/factory-arm/engine/obstacles';

// Constants
import type { NAMES } from '@/views/experiments/factory-arm/workspace/panel/manual/shapes/constants';

type Props = { shape: (typeof NAMES)[number] };

const Shape: React.FunctionComponent<Props> = ({ shape }) => {
  const { t } = useTranslation('factory-arm');
  const { cell } = useCellContext();
  const [width, height, depth] = SHAPES[shape].size;

  return (
    <ListItem>
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
        <Text
          className={classNames('kicl-font-family-mono', 'kicl-color-grey')}
          is='span'
        >
          {t('size', { depth, height, width })}
        </Text>
      </Button>
    </ListItem>
  );
};

export { Shape };
