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

// Context
import { useHub } from '@/views/experiments/factory-arm/floor/hub';

// Constants
import { COPY } from '@/views/experiments/factory-arm/floor/constants';

const time = (at: number) =>
  new Date(at).toLocaleTimeString([], { hour12: false });

/** Every step the stations took, newest first, each with the arm it came from. */
const Log: React.FunctionComponent = () => {
  const { clearLog, log } = useHub();

  return (
    <>
      <Layout alignContent='start' gap='normal'>
        <CardContent>
          {log.length ? (
            <List>
              {log.map((entry) => (
                <ListItem key={entry.id}>
                  <Layout
                    alignItems='baseline'
                    autoFlow='column'
                    frames='max-content--auto'
                    gap='narrow'
                    justifyContent='start'
                  >
                    <div>
                      <time
                        className={classNames(
                          'kicl-color-grey',
                          'kicl-font-family-mono',
                          'kicl-font-size-smaller'
                        )}
                      >
                        {time(entry.at)}
                      </time>
                      <Badge level={entry.level} size='small'>
                        {entry.arm}
                      </Badge>
                      <Badge level={entry.level} size='small' variant='ghost'>
                        <BadgeLabel>{entry.text}</BadgeLabel>
                        {entry.detail || 'ack'}
                      </Badge>
                    </div>
                  </Layout>
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
