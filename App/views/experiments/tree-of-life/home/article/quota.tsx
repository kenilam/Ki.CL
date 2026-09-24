import React, { useId } from 'react';

// Components
import { Heading, Layout, Text } from '@/components';

const Quota: React.FunctionComponent = () => {
  const id = useId();

  return (
    <Layout justifyItems='start'>
      <section aria-labelledby={id}>
        <Heading id={id} is='h2' className='kicl-font-size-large'>
          Quota, failover and the long wait
        </Heading>

        <Text is='p'>
          Generation runs across a chain of providers, tried in order, each with
          its own bounded retries. A provider that hits a limit it can’t retry
          past goes into cooldown and is skipped, so the next one takes the
          request. Text, images and vision each have their own chain.
        </Text>

        <Text is='p'>
          There are two ways to run out. A daily allowance comes back tomorrow,
          and an empty balance comes back when someone pays. I’d been treating
          both as a thirty-minute cooldown, which meant hitting a spent account
          twice an hour forever and telling readers to “try again shortly” about
          a problem only a billing page could solve. The two are now separate
          all the way through to the panel, so it says which kind of wait it is.
        </Text>

        <Text is='p'>
          A plate takes much longer than a request should, so generation is
          asynchronous. The query returns whatever exists now, and a GraphQL
          subscription pushes the finished plate when it lands. Requests are
          rate limited per day. The API sits behind a proxy and takes no public
          callers, so every request carries an identity token minted by the
          site, not the browser.
        </Text>
      </section>
    </Layout>
  );
};

export { Quota };
