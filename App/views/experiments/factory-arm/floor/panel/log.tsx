import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import {
  Badge,
  BadgeLabel,
  Button,
  CardContent,
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

// Constants
import { COPY } from '@/views/experiments/factory-arm/floor/constants';

const time = (at: number) =>
  new Date(at).toLocaleTimeString([], { hour12: false });

/** Every step the stations took, newest first, each with the arm it came from, marked when that arm was on the bridge. */
const Log: React.FunctionComponent = () => {
  const { clearLog, log } = useHub();

  return (
    <>
      <Layout alignContent='start' gap='normal'>
        <CardContent>
          {log.length ? (
            <List>
              {log.map((entry) => (
                <ListItem
                  alignItems='center'
                  autoFlow='column'
                  frames='max-content--max-content--auto'
                  gap='narrow'
                  justifyItems='end'
                  key={entry.id}
                >
                  <Badge level={entry.level} size='small'>
                    {entry.remote ? <Ri.RiRobot2Line aria-hidden /> : <Ri.RiCircleLine aria-hidden />}
                    {entry.arm}
                  </Badge>
                  <Badge level={entry.level} size='small' variant='ghost'>
                    <BadgeLabel>{entry.text}</BadgeLabel>
                    {entry.detail || 'ack'}
                  </Badge>
                  <time
                    className={classNames(
                      'kicl-color-grey',
                      'kicl-font-family-mono',
                      'kicl-font-size-smaller'
                    )}
                  >
                    {time(entry.at)}
                  </time>
                </ListItem>
              ))}
            </List>
          ) : (
            <Text
              className={classNames('kicl-color-grey', 'kicl-font-size-small')}
              is='p'
            >
              {COPY.panel.empty}
            </Text>
          )}
        </CardContent>
      </Layout>

      {log.length > 0 && (
        <SheetFooter>
          <Button
            className='kicl-inline-size-full'
            justifyContent='center'
            onClick={clearLog}
            size='small'
            variant='secondary'
          >
            {COPY.panel.clear}
          </Button>
        </SheetFooter>
      )}
    </>
  );
};

export { Log };
