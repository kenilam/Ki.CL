import React from 'react';

// Components
import {
  Badge,
  getButtonClassNames,
  Layout,
  List,
  ListItem,
  Text,
} from '@/components';

// Icons
import { Ri } from '@/icons';

type Row = { press: readonly string[]; does: string };

/** The keys and gestures drawn as icons; any other is written as it is. */
const ICONS = {
  click: <Ri.RiCursorLine aria-label='click' />,
  del: <Ri.RiDeleteBack2Line aria-label='del' />,
  'double-click': (
    <>
      <Ri.RiCursorLine aria-label='double-click' />
      <Text is='span' className='kicl-line-height-narrower'>
        ×2
      </Text>
    </>
  ),
  down: <Ri.RiArrowDownLine aria-label='down' />,
  drag: <Ri.RiDragMove2Line aria-label='drag' />,
  'right-drag': (
    <>
      <Ri.RiMouseLine aria-label='right button' />
      <Ri.RiDragMove2Line aria-label='drag' />
    </>
  ),
  scroll: <Ri.RiZoomInLine aria-label='scroll' />,
  left: <Ri.RiArrowLeftLine aria-label='left' />,
  right: <Ri.RiArrowRightLine aria-label='right' />,
  shift: (
    <>
      <Text is='span' className='kicl-line-height-narrower'>
        ⇧
      </Text>
      <Ri.RiAddLine />
    </>
  ),
  up: <Ri.RiArrowUpLine aria-label='up' />,
} as const;

/** How to work something: a row per action, its keys as key caps and what it does beside them. */
const Keys: React.FunctionComponent<{ rows: readonly Row[] }> = ({ rows }) => (
  <List className='kicl-padding-block-narrow' gap='none'>
    {rows.map(({ does, press }) => (
      <ListItem
        alignItems='center'
        autoFlow='column'
        className={getButtonClassNames({ variant: 'tertiary' })}
        key={does}
        gap='narrow'
      >
        <Layout alignItems='center' autoFlow='column' gap='narrower'>
          <span>
            {press.map((key) => {
              const Icon = ICONS[key as keyof typeof ICONS];

              return (
                <Badge variant='outline' key={key}>
                  {Icon || key}
                </Badge>
              );
            })}
          </span>
        </Layout>
        <Text className='kicl-font-size-small' variant='secondary'>
          {does}
        </Text>
      </ListItem>
    ))}
  </List>
);

export { Keys };
