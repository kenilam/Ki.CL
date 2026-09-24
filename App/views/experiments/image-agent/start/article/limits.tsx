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
          A person is identified by their session cookie or their network
          address, and usage under either one counts, so clearing the cookie
          doesn’t reset their limits. The downside is that people on the same
          network share limits.
        </Text>
        <Text is='p'>
          The address is never stored as it is. It’s hashed with a secret key,
          and IPv6 addresses are trimmed to their{' '}
          <Text is='code' variant='secondary'>
            /64
          </Text>{' '}
          first.
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
