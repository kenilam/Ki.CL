import React from 'react';

// Components
import { Layout, ListItem, Popover, PopoverContent } from 'design/components';

// Partials
import { Range } from './range';
import { Trigger } from './trigger';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/kinetic-light/constants';

const CLASS_NAME = `${VIEW}__player__settings`;

const KEYS = ['zoom', 'hue', 'glow'] as const;

const Settings: React.FunctionComponent = () => {
  return (
    <ListItem>
      <Popover>
        <Trigger />
        <PopoverContent placement='block-start-start'>
          <Layout autoFlow='row' gap='narrow'>
            <section className={CLASS_NAME}>
              {KEYS.map((key) => {
                return <Range key={key} name={key} />;
              })}
            </section>
          </Layout>
        </PopoverContent>
      </Popover>
    </ListItem>
  );
};

export { Settings };
