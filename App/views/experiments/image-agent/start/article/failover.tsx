import React from 'react';

// Components
import { Details, Heading, Layout, List, ListItem, Text } from '@/components';

const CHAINS = [
  {
    name: 'Pictures',
    chain: [
      'OpenAI gpt-image-1',
      'Flux Schnell on Cloudflare',
      'Flux on Pollinations',
      'Gemini',
    ],
  },
  {
    name: 'Text',
    chain: [
      'gpt-4o-mini',
      'Llama 3.3 70B on Groq',
      'three Gemini Flash models',
    ],
  },
  { name: 'Reviews', chain: ['gpt-4o', 'Gemini'] },
];

/** Failover: the provider chains, timeouts, cooldowns, and what waiting means. */
const Failover: React.FunctionComponent = () => (
  <Details
    summary={
      <Heading is='h2' className='kicl-font-size-large'>
        When a provider stops answering
      </Heading>
    }
  >
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <div>
        <Text is='p'>
          Each kind of model call has its own chain of providers to fall back
          through:
        </Text>
        <List gap='narrower'>
          {CHAINS.map(({ chain, name }) => (
            <ListItem key={name}>
              <Text is='span'>
                {name}: {chain.join(', then ')}
              </Text>
            </ListItem>
          ))}
        </List>
        <Text is='p'>
          Groq isn’t in the review chain because none of the models on my
          account can take an image.
        </Text>
        <Heading is='h3' className='kicl-font-size-medium'>
          Timeouts and retries
        </Heading>
        <Text is='p'>
          If a call times out (30 seconds for text, 45 for a review, 90 for a
          picture), I move straight on to the next provider. One that hung once
          tends to hang again. Other errors get up to three retries, one second
          apart and then two.
        </Text>
        <Heading is='h3' className='kicl-font-size-medium'>
          Quota and credit
        </Heading>
        <Text is='p'>
          Running out of quota and running out of credit look alike but need
          different handling. A provider whose quota is used up is skipped for
          30 minutes, or however long it asks for. One that’s out of credit is
          skipped for a day, because it only comes back when someone tops up the
          account.
        </Text>
        <Text is='p'>
          Before I split the two, every call burned three retries on an empty
          account before moving on.
        </Text>
        <Heading is='h3' className='kicl-font-size-medium'>
          When everything fails
        </Heading>
        <Text is='p'>
          When every provider has failed, the error says whether waiting will
          help. If even one provider has a quota that refills, it says to try
          later. Otherwise it says waiting won’t help.
        </Text>
        <Text is='p'>
          The first version always said to try again shortly, even when that
          wasn’t true.
        </Text>
      </div>
    </Layout>
  </Details>
);

export { Failover };
