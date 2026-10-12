import React from 'react';

// Components
import {
  Details,
  Heading,
  List,
  ListItem,
  Markdown,
  Text,
} from 'design/components';

// Context
import { useVersion } from '@/views/resume/context';

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
      open={index === 0}
      summary={
        <>
          <Heading dense is='h3'>
            {title}
            <Text className='kicl-font-weight-light' dense is='span'>
              {` · ${organisation}`}
            </Text>
          </Heading>
          <Text
            className='kicl-text-nowrap'
            dense
            is='span'
            variant='secondary'
          >
            {dates}
          </Text>
        </>
      }
    >
      <List gap='narrower'>
        {points.map((line, index) => (
          <ListItem key={index}>
            <Text dense>
              <Markdown>{line}</Markdown>
            </Text>
          </ListItem>
        ))}
      </List>
    </Details>
  );
};

export { Role };
