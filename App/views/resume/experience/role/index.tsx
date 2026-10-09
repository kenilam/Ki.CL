import React from 'react';

// Components
import {
  Details,
  DetailsMarker,
  Heading,
  Layout,
  List,
  ListItem,
  Text,
} from 'design/components';

// Context
import { useVersion } from '@/views/resume/context';

// Partials
import { Runs } from '@/views/resume/runs';

type Props = {
  /** Where the role is in the version's experience, newest first. */
  index: number;
};

/**
 * One role, as a disclosure. The title, the employer and the dates are the
 * summary, and what was done is behind it. The current role starts open, and
 * a reader can open or close any of them. On paper every one prints open.
 */
const Role: React.FunctionComponent<Props> = ({ index }) => {
  const { experience } = useVersion();

  const { dates, organisation, points, title } = experience[index];

  return (
    <Details
      marker={false}
      open={index === 0}
      summary={
        <>
          <Heading className='kicl-margin-inline-end-auto' dense is='h3'>
            {title}
            <Text className='kicl-font-weight-light' is='span'>
              {` · ${organisation}`}
            </Text>
          </Heading>
          {/* The dates and the marker end the row together. */}
          <Layout alignItems='center' display='flex' gap='narrower'>
            <span>
              <Text
                className='kicl-text-nowrap'
                dense
                is='span'
                variant='secondary'
              >
                {dates}
              </Text>
              <DetailsMarker />
            </span>
          </Layout>
        </>
      }
    >
      <List gap='narrower'>
        {points.map((line, index) => (
          <ListItem key={index}>
            <Text dense>
              <Runs line={line} />
            </Text>
          </ListItem>
        ))}
      </List>
    </Details>
  );
};

export { Role };
