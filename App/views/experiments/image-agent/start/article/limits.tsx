import React from 'react';

// Components
import { Details, Diagram, Heading, Layout, Text } from '@/components';

// Diagrams
import { allowance } from './diagrams/allowance';
import { howItWorks } from './diagrams/how-it-works';

/** Rate limiting: the limits, who a person is, and what gets counted. */
const Limits: React.FunctionComponent = () => (
  <Details
    summary={
      <Heading is='h2' className='kicl-font-size-large'>
        Limits
      </Heading>
    }
  >
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <div>
        <Text is='p'>
          Pictures cost money and anyone can use this without an account, so a
          lot of the backend is limits. A day means the last 24 hours, not since
          midnight.
        </Text>
        <Diagram spec={allowance} />
        <Diagram spec={howItWorks} />
        <Heading is='h3' className='kicl-font-size-medium'>
          Who counts as a person
        </Heading>
        <Text is='p'>
          A person is their session. The first visit passes a Turnstile check
          and gets a token, and every request after that is counted against it.
          Clearing cookies or changing device starts a new session with a new
          allowance. That is accepted: the check is what stops a script from
          doing it on a loop.
        </Text>
        <Text is='p'>
          The network address is not read or stored, so people who share a
          network do not share limits.
        </Text>
        <Text is='p'>
          Counts are read from MongoDB instead of kept in memory, so restarting
          the server doesn’t reset anyone’s allowance.
        </Text>
        <Text is='p'>
          A refused request comes back as{' '}
          <Text is='code' accent='error'>
            TOO_MANY_REQUESTS
          </Text>{' '}
          and isn’t recorded. Otherwise a double-click would use up allowance
          and restart the cooldown that refused it.
        </Text>
        <Text is='p'>
          When a limit shared by everyone runs out, the error doesn’t say which
          one or when it resets. That would tell someone trying to get around it
          where to look.
        </Text>
      </div>
    </Layout>
  </Details>
);

export { Limits };
