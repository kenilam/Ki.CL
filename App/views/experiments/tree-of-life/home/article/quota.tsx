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
          its own bounded retries. When one reports a limit it can’t retry past,
          it goes into cooldown and gets skipped so the next one can take the
          request instead of the whole thing dying. Text, images and vision each
          have their own chain.
        </Text>

        <Text is='p'>
          Running out comes in two kinds. A daily allowance comes back tomorrow.
          An empty balance comes back when someone pays. I’d been treating both
          as a thirty-minute cooldown, which meant hammering a spent account
          twice an hour forever and telling readers to “try again shortly” about
          a problem only a billing page could solve. The two are separate now,
          all the way through to the panel, so it tells you which kind of wait
          you’re in for.
        </Text>

        <Text is='p'>
          A plate takes much longer than any request should, so generation is
          asynchronous. The query returns whatever exists right now, and a
          GraphQL subscription pushes the finished plate when it lands. Requests
          are rate limited per day. The API sits behind a proxy and takes no
          public callers at all, so everything arrives carrying an identity
          token minted by the site rather than by the browser.
        </Text>
      </section>
    </Layout>
  );
};

export { Quota };
