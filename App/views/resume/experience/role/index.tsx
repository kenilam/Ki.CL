import React, { useId } from 'react';

// Components
import {
  Badge,
  Card,
  Details,
  Heading,
  Layout,
  List,
  ListItem,
  Markdown,
  Text,
} from 'design/components';

// Context
import { useVersion } from '@/views/resume/context';

// Partials
import { Logo } from './logo';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as RESUME } from '@/views/resume/constants';

const CLASS_NAME = `${RESUME}__role`;

type Props = {
  /** Where the role is in the version's experience, newest first. */
  index: number;
};

/**
 * One role, as a card headed by the employer. The title and the dates are the
 * summary of a disclosure, and what was done is behind it. The current role
 * starts open, and on paper every one prints open.
 */
const Role: React.FunctionComponent<Props> = ({ index }) => {
  const { experience } = useVersion();

  const { dates, organisation, points, title } = experience[index];

  const headingId = useId();

  return (
    <Card
      aria-labelledby={headingId}
      className={CLASS_NAME}
      gap='narrow'
      is='article'
    >
      <Layout alignItems='center' display='flex' gap='narrow'>
        <header>
          <Logo index={index} />
          <Heading dense id={headingId} is='h3'>
            {organisation}
          </Heading>
        </header>
      </Layout>
      <Details
        open={index === 0}
        summary={
          <Layout
            alignItems='center'
            display='flex'
            gap='narrower'
            justifyContent='space-between'
            wrap
          >
            <span>
              <Text className='kicl-font-weight-bold' dense is='span'>
                {title}
              </Text>
              <Badge className={`${CLASS_NAME}__dates`} variant='ghost'>
                {dates}
              </Badge>
            </span>
          </Layout>
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
    </Card>
  );
};

export { Role };
