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
          every plate in the library carried an identical score -
          <code> overall 7, taxonMatch 7, pass true</code> - across more than a
          hundred images. It was a hardcoded fallback: the vision provider had
          run out of credit, the call threw, and rather than admit it hadn’t
          looked, the pipeline filled in a pass. The entire library was marked
          as reviewed when none of it had been.
        </Text>

        <Text is='p'>
          Three different code paths could invent that pass, and not one of them
          recorded that it had, so the database couldn’t tell a real review from
          a fabricated one. A review that didn’t happen is now stored as no
          review at all. The scorer also has its own provider chain, so one
          spent account can’t silence it.
        </Text>

        <Text is='p'>
          The rubric needed work as well. It checked whether the organism was
          the right one and whether it matched a morphology lock, but nothing in
          it asked whether the anatomy was even <em>possible</em>. A human with
          its head at an impossible angle, malformed fingers and a garbled
          caption passed on morphology. Anatomy is judged separately from
          identity now, which is the only way the scorer can say “right species,
          broken body”.
        </Text>

        <Text is='p'>
          I also took the bans out of the prompts. Naming a thing to forbid it
          just puts it in the picture. A list reading “no insects, no mites”
          produced microbes drawn as mites, and a fallback morphology that ended
          “not a macroscopic animal” had been doing the same to every microbe in
          the library.
        </Text>
      </section>
    </Layout>
  );
};

export { TuningTheReviewer };
