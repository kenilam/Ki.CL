import React, { useId } from 'react';

// Components
import { Heading, Layout, Text } from '@/components';

const TuningTheReviewer: React.FunctionComponent = () => {
  const id = useId();

  return (
    <Layout justifyItems='start'>
      <section aria-labelledby={id}>
        <Heading id={id} is='h2' className='kicl-font-size-large'>
          Tuning the reviewer
        </Heading>

        <Text is='p'>
          Scoring turned out to matter more than generating. For a long stretch
          every plate in the library, more than a hundred images, carried the
          same score:
          <Text is='code'> overall 7, taxonMatch 7, pass true</Text>. It was a
          hardcoded fallback. The vision provider had run out of credit, the
          call threw, and the pipeline filled in a pass instead of admitting it
          hadn’t looked. The whole library was marked as reviewed when none of
          it had been.
        </Text>

        <Text is='p'>
          Three code paths could invent that pass and none of them recorded it,
          so the database couldn’t tell a real review from a fabricated one. A
          review that didn’t happen is now stored as no review. The scorer also
          has its own provider chain, so one spent account can’t silence it.
        </Text>

        <Text is='p'>
          The rubric needed work too. It checked that the organism was the right
          one and matched a morphology lock, but never asked whether the anatomy
          was <em>possible</em>. A human with its head at an impossible angle,
          malformed fingers and a garbled caption passed on morphology. Anatomy
          is now judged separately from identity, so the scorer can say “right
          species, broken body”.
        </Text>

        <Text is='p'>
          I also took the bans out of the prompts, because naming a thing to
          forbid it puts it in the picture. A list reading “no insects, no
          mites” produced microbes drawn as mites, and a fallback morphology
          ending in “not a macroscopic animal” had been doing the same to every
          microbe in the library.
        </Text>
      </section>
    </Layout>
  );
};

export { TuningTheReviewer };
