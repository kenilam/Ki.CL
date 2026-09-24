import React from 'react';

// Components
import {
  Details,
  Diagram,
  Heading,
  Layout,
  List,
  ListItem,
  Text,
} from '@/components';

// Diagrams
import { governing } from './diagrams/governing';

const RULES = [
  'A short list of unambiguous words',
  'Prompt injection phrases like “ignore previous instructions” and “developer mode”',
  'Links, since the agent can’t open them',
  'Messages with fewer than three letters',
  'Keyboard mashing, caught by how few distinct characters a long message uses',
];

/** Governing: the four checks, their order, and how each one fails. */
const Governing: React.FunctionComponent = () => (
  <Details
    summary={
      <Heading is='h2' className='kicl-font-size-large'>
        What gets through
      </Heading>
    }
  >
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <div>
        <Text is='p'>
          Every message goes through four checks, cheapest first. Limits are
          checked before anything is saved. Then come some rules in plain code,
          OpenAI’s{' '}
          <Text is='code' variant='secondary'>
            omni-moderation-latest
          </Text>
          , and last a small language model that decides whether the message is
          asking for a picture at all.
        </Text>
        <Diagram spec={governing} />
        <Text is='p'>
          A limit returns an error and the message isn’t recorded. The other
          three return a refusal, and the message is hidden from the
          conversation but still counts towards the person’s limits.
        </Text>
        <Heading is='h3' className='kicl-font-size-medium'>
          Rules
        </Heading>
        <Text is='p'>The rules catch what doesn’t need a model:</Text>
        <List gap='narrower'>
          {RULES.map((rule) => (
            <ListItem key={rule}>
              <Text is='span'>{rule}</Text>
            </ListItem>
          ))}
        </List>
        <Text is='p'>
          I left words like “naked” and “murder” off the list. “Naked mole rat”
          and “a murder of crows” are fine pictures, and moderation reads those
          words in context.
        </Text>
        <Heading is='h3' className='kicl-font-size-medium'>
          Moderation and the classifier
        </Heading>
        <Text is='p'>
          Moderation is free and good at safety, but it can’t tell whether
          “hello”, “test” or a question about the weather is a picture request.
          The classifier does that.
        </Text>
        <Text is='p'>
          It gets the new message and the earlier turns wrapped in markers (
          <Text is='code' variant='secondary'>
            {'<<<MESSAGE>>>'}
          </Text>{' '}
          …{' '}
          <Text is='code' variant='secondary'>
            {'<<<END>>>'}
          </Text>
          ), and its prompt tells it to treat what’s inside as data to judge,
          never as instructions. It needs the earlier turns because a reply like
          “illustration, at dusk” makes no sense on its own.
        </Text>
        <Heading is='h3' className='kicl-font-size-medium'>
          When a check fails to run
        </Heading>
        <Text is='p'>
          If moderation ran and the classifier then errored, the message goes
          through, because the safety check already happened. If neither ran,
          the message is refused, so unchecked text never reaches the image
          model.
        </Text>
        <Heading is='h3' className='kicl-font-size-medium'>
          Refusals
        </Heading>
        <Text is='p'>
          The image providers have their own filters too. If one turns down a
          prompt that got past mine, the person gets a refusal instead of an
          error, and I don’t retry it with the next provider.
        </Text>
      </div>
    </Layout>
  </Details>
);

export { Governing };
