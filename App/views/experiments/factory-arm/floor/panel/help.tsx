import React from 'react';

// Components
import { Details, Heading, Layout, SheetFooter, Text } from '@/components';

// Icons
import { Ri } from '@/icons';

// Partials
import { Keys } from './keys';

type Props = React.ComponentProps<typeof Keys> & { title: string };

/** How to work a tab, folded in its footer so the tab keeps the room. */
const Help: React.FunctionComponent<Props> = ({ rows, title }) => (
  <SheetFooter>
    <Details
      summary={
        <Layout alignItems='center' autoFlow='column' gap='narrow'>
          <Heading is='h6' dense>
            <Ri.RiInformation2Line />
            <Text className='kicl-font-size-small' is='span'>
              {title}
            </Text>
          </Heading>
        </Layout>
      }
    >
      <Keys rows={rows} />
    </Details>
  </SheetFooter>
);

export { Help };
