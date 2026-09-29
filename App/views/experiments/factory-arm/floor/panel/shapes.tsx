import React from 'react';

// Components
import {
  Button,
  CardContent,
  Details,
  Heading,
  Layout,
  List,
  ListItem,
  SheetFooter,
  Text,
} from '@/components';

// Icons
import { Ri } from '@/icons';

// Context
import { useHub } from '@/views/experiments/factory-arm/floor/hub';
import {
  type Shape,
  SHAPES,
} from '@/views/experiments/factory-arm/floor/hub/obstacles';

// Partials
import { Keys } from './keys';

// Constants
import { COPY } from '@/views/experiments/factory-arm/floor/constants';

/** The drawing's box, in its own units. */
const VIEW = 96;

/** How far the depth axis runs per metre, and the way it goes: up and to the right. */
const OBLIQUE = { x: 0.5, y: -0.5 };

/** Every shape drawn to one scale: the tallest, with its depth, fills the box. */
const SCALE =
  (VIEW - 8) /
  Math.max(
    ...Object.values(SHAPES).map(
      ({ base, size }) => base + size[1] + size[2] * -OBLIQUE.y
    ),
    ...Object.values(SHAPES).map(({ size }) => size[0] + size[2] * OBLIQUE.x)
  );

/**
 * A shape as a box drawn obliquely: its front face, and its top and right
 * faces receding at half depth. It stands on the floor line at its base
 * height, so a beam is seen to hang.
 */
const Drawing: React.FunctionComponent<{ shape: Shape }> = ({ shape }) => {
  const { base, size } = SHAPES[shape];
  const [width, height, depth] = size.map((metres) => metres * SCALE);
  const lift = base * SCALE;
  const floor = VIEW - 4;
  const left = (VIEW - width - depth * OBLIQUE.x) / 2;
  const bottom = floor - lift;
  const top = bottom - height;
  const right = left + width;
  const dx = depth * OBLIQUE.x;
  const dy = depth * OBLIQUE.y;
  const face = (points: number[][]) =>
    points.map(([x, y]) => `${x},${y}`).join(' ');

  return (
    <svg
      aria-hidden
      fill='currentColor'
      height={VIEW}
      width={VIEW}
      stroke='currentColor'
      strokeLinejoin='round'
      viewBox={`0 0 ${VIEW} ${VIEW}`}
    >
      <line
        strokeDasharray='2 3'
        x1={0}
        x2={VIEW}
        y1={floor}
        y2={floor}
        opacity={0.4}
      />
      <polygon
        fillOpacity={0.08}
        points={face([
          [left, bottom],
          [right, bottom],
          [right, top],
          [left, top],
        ])}
      />
      <polygon
        fillOpacity={0.2}
        points={face([
          [left, top],
          [right, top],
          [right + dx, top + dy],
          [left + dx, top + dy],
        ])}
      />
      <polygon
        fillOpacity={0.14}
        points={face([
          [right, top],
          [right + dx, top + dy],
          [right + dx, bottom + dy],
          [right, bottom],
        ])}
      />
    </svg>
  );
};

/** The shapes an obstacle can take, one row each: what it looks like, how big it is, and a button that sets one down beside a belt. Under them, how to work one. */
const Shapes: React.FunctionComponent = () => {
  const { put } = useHub();

  return (
    <>
      <CardContent>
        <List gap='narrow'>
          {(Object.keys(SHAPES) as Shape[]).map((shape) => (
            <ListItem
              alignItems='center'
              autoFlow='column'
              frames='max-content--auto--max-content'
              gap='narrow'
              key={shape}
            >
              <Drawing shape={shape} />
              <Text className='kicl-font-size-small' is='span'>
                {COPY.panel.shapes[shape]}{' '}
                <Text is='span' variant='secondary'>
                  {COPY.panel.size(SHAPES[shape].size)}
                </Text>
              </Text>
              <Button
                onClick={() => put(shape)}
                size='small'
                variant='secondary'
              >
                <Ri.RiAddLine aria-hidden />
                <span className='kicl-hidden'>{COPY.panel.add}</span>
              </Button>
            </ListItem>
          ))}
        </List>
      </CardContent>

      {/* Folded by default, so the shapes keep the room. */}
      <SheetFooter>
        <Details
          summary={
            <Layout alignItems='center' autoFlow='column' gap='narrow'>
              <Heading is='h6' dense>
                <Ri.RiInformation2Line />
                <Text className='kicl-font-size-small' is='span'>
                  {COPY.panel.obstacle.help}
                </Text>
              </Heading>
            </Layout>
          }
        >
          <Keys />
        </Details>
      </SheetFooter>
    </>
  );
};

export { Shapes };
