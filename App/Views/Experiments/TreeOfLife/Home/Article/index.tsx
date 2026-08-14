import React from 'react';

// Components
import { Heading, HyperLink, Layout, Text } from '@/Components';

// Partials
import Figure from './Figure';

// Constants
import { toVersionPath } from '@/Views/Experiments/TreeOfLife/Versions/constants';
import { VERSION } from '@/Views/Experiments/TreeOfLife/Versions/v15/constants';

// Styles
import './Styles.scss';

/**
 * How the experiment got here: the reference it chased, what each generation
 * of the view traded away, and what the final one gave up to be usable.
 */

const CLASS_NAME = 'kicl--views--experiments--tree-of-life';
/*
 * Served from the `static` bucket through the API's asset proxy rather than
 * committed to this repository.
 *
 * Named for what they are, not for their contents, so re-encoding one is an
 * upload and nothing else — no name here has to change. The proxy sends these
 * revalidating rather than immutable to make that safe.
 */
const IMAGES = '/assets/static';
const ORIGINAL_VISION = `${IMAGES}/original-vision.webp`;
const PERROT_1854 = `${IMAGES}/perrot-1854.webp`;
const V14 = `${IMAGES}/v14.webp`;

const Article: React.FunctionComponent = () => {
  return (
    <Layout
      justifyContent='start'
      justifyItems='start'
      alignItems='start'
      alignContent='start'
    >
      <article className={`${CLASS_NAME}__article`}>
        <section>
          <Heading is='h2' className='kicl-font-size-large'>
            Where it started
          </Heading>

          <Text is='p'>
            I started from{' '}
            <HyperLink
              to='https://observablehq.com/@d3/tree-of-life'
              target='_blank'
              rel='noreferrer'
            >
              D3’s Tree of Life
            </HyperLink>
            . It’s a radial dendrogram: curved links, tips labelled around the
            circumference, branch lengths that carry real distance. As a diagram
            of structure it’s complete. You can see the shape of a phylogeny and
            how far apart its members sit, and that’s a lot.
          </Text>

          <Text is='p'>
            What you can’t see is what any of them look like. Every tip is just
            a name. I wanted the shape and the creatures on the same page, which
            turned out to be a much bigger ask than it sounds.
          </Text>
        </section>

        <section>
          <header>
            <Heading is='h2' className='kicl-font-size-large'>
              The picture I was chasing
            </Heading>

            <Text is='p'>
              Here’s the thing I wanted to build. Every branch of life on one
              sheet, and at the end of each branch something you’d actually
              recognise: a horse, a nautilus, a fly agaric. The shape of the
              tree and the creatures it made, in one picture.
            </Text>

            <Text is='p'>
              Then there’s the number. The Open Tree of Life holds about 2.3
              million tips. Almost every decision below comes out of that one
              figure, because you can’t draw that many, you can’t illustrate
              them, and you certainly can’t fetch them. So the question changed.
              It stopped being how to draw the tree and became what to show
              someone standing inside something that big.
            </Text>
          </header>

          <Figure
            data={ORIGINAL_VISION}
            alt='A printed tree of life poster: coloured branches radiating from “Origin of life” at the base, each tip ending in a painted organism.'
            caption='Where I started. Around 250 tips, every one illustrated by hand.'
          />
        </section>

        <section>
          <Heading is='h2' className='kicl-font-size-large'>
            Fifteen attempts
          </Heading>

          <Text is='p'>
            Each version is a fresh attempt, not a revision of the one before
            it, which is why they’re all still online.{' '}
            <HyperLink to={toVersionPath({ version: '1' })}>v1</HyperLink> to{' '}
            <HyperLink to={toVersionPath({ version: '8' })}>v8</HyperLink> went
            into WebGL: the whole clade laid out at once, on a cream background
            borrowed from the poster. They looked the part. Past a few hundred
            taxa, though, the layout collapsed into a mat of dots, and every dot
            was the same few pixels no matter where it sat.
          </Text>

          <Text is='p'>
            <HyperLink to={toVersionPath({ version: '9' })}>v9</HyperLink> to{' '}
            <HyperLink to={toVersionPath({ version: '13' })}>v13</HyperLink>{' '}
            went the other way and turned into documents: DOM and SVG, tip
            first, one clade at a time, drag and zoom instead of a fixed
            composition. Now you could read a name. What you’d lost was any
            sense of distance, of how far you’d travelled from the origin, and
            the whole thing felt flat.
          </Text>

          <Figure
            data={V14}
            alt='The v14 view: a wide, pale map of the tree with labelled nodes spread across the frame.'
            caption={
              <>
                <HyperLink to={toVersionPath({ version: '14' })}>v14</HyperLink>
                , the map. You can see all of it
              </>
            }
          />

          <Text is='p'>
            <HyperLink to={toVersionPath({ version: '14' })}>v14</HyperLink> was
            the widest of them, and it made the trade obvious: show everything
            and you emphasise nothing. So{' '}
            <HyperLink to={toVersionPath({ version: VERSION })}>
              v{VERSION}
            </HyperLink>{' '}
            gave it up. It frames one taxon and whatever sits near it, lets the
            rest fade into the background, and puts the route in charge of what
            you’re looking at.
          </Text>
        </section>

        <section>
          <Heading is='h2' className='kicl-font-size-large'>
            What the backend does
          </Heading>

          <Text is='p'>
            Open Tree answers questions about subtrees. Ask it for a node and
            you get whatever hangs below that node, up to a height limit, which
            means the node you asked for arrives with no parent attached. Store
            that as-is and you’ve just recorded that a genus is the root of all
            life.
          </Text>

          <Text is='p'>
            Which is exactly what happened. <em>Panthera</em> turned up as the
            centre of the universe with nothing above it, and it took me
            embarrassingly long to work out why, because the symptom sits
            nowhere near the cause. The fix was to stop recording “no parent”
            and “no parent yet” the same way. A cold fetch now pulls the node’s
            rootward lineage too: the whole spine back to the origin, unnamed
            internal nodes included. A stored null means the origin, and nothing
            else.
          </Text>

          <Text is='p'>
            It all caches in MongoDB as a parent-pointer model. Each node stores
            its own ancestor and nothing more; children come from a reverse
            lookup. Writes are idempotent upserts, because lineages that share
            ancestors get written at the same time and two requests will race
            for the same row. They did exactly that, loudly, the first time I
            emptied the database.
          </Text>
        </section>

        <section>
          <Heading is='h2' className='kicl-font-size-large'>
            Drawing organisms nobody photographed
          </Heading>

          <Text is='p'>
            Most of those 2.3 million tips are bacteria, archaea, and unnamed
            internal nodes. Nobody has photographed “uncultured Crater Lake
            bacterium CL500-11”. So the plates are generated, aiming at the look
            of a 19th-century hand-coloured lithograph, the same register as the
            plate below.
          </Text>

          <Figure
            data={PERROT_1854}
            alt='A hand-coloured 1854 natural-history plate by Perrot: animals arranged across a pale staged ground with fine engraved linework.'
            caption='Perrot, 1854. Fine engraved linework, muted washes, a plain staged ground. This is what every generated plate is aiming at.'
          />

          <Text is='p'>
            The pipeline is fixed, not agentic. It resolves the lineage, picks
            one real living specimen to stand in for the taxon, writes a prompt
            from that specimen’s morphology, generates an image, then hands the
            result to a vision model for scoring. Fail the score and the prompt
            gets tightened for one more try.
          </Text>
        </section>

        <section>
          <Heading is='h2' className='kicl-font-size-large'>
            Tuning the reviewer
          </Heading>

          <Text is='p'>
            Scoring turned out to matter more than generating. For a long
            stretch every plate in the library carried an identical score —
            <code> overall 7, taxonMatch 7, pass true</code> — across more than
            a hundred images. No model produces that. It was a hardcoded
            fallback: the vision provider had run out of credit, the call threw,
            and rather than admit it hadn’t looked, the pipeline filled in a
            pass. The entire library was marked as reviewed when none of it had
            been.
          </Text>

          <Text is='p'>
            Three different code paths could invent that pass, and not one of
            them recorded that it had, so the database couldn’t tell a real
            review from a fabricated one. A review that didn’t happen is now
            stored as no review at all. The scorer also has its own provider
            chain, so one spent account can’t silence it.
          </Text>

          <Text is='p'>
            The rubric needed work as well. It checked whether the organism was
            the right one and whether it matched a morphology lock, but nothing
            in it asked whether the anatomy was even <em>possible</em>. A human
            with its head at an impossible angle, malformed fingers and a
            garbled caption sailed through on morphology. Anatomy is judged
            separately from identity now, which is the only way the scorer can
            say “right species, broken body”.
          </Text>

          <Text is='p'>
            I also took the bans out of the prompts. Naming a thing to forbid it
            just puts it in the picture. A list reading “no insects, no mites”
            produced microbes drawn as mites, and a fallback morphology that
            ended “not a macroscopic animal” had been quietly doing the same to
            every microbe in the library.
          </Text>
        </section>

        <section>
          <Heading is='h2' className='kicl-font-size-large'>
            Quota, failover and the long wait
          </Heading>

          <Text is='p'>
            Generation runs across a chain of providers, tried in order, each
            with its own bounded retries. When one reports a limit it can’t
            retry past, it goes into cooldown and gets skipped so the next one
            can take the request instead of the whole thing dying. Text, images
            and vision each have their own chain.
          </Text>

          <Text is='p'>
            Running out isn’t always the same thing, which took me a while to
            accept. A daily allowance comes back tomorrow. An empty balance
            comes back when someone pays. I’d been treating both as a
            thirty-minute cooldown, which meant hammering a spent account twice
            an hour forever and telling readers to “try again shortly” about a
            problem only a billing page could solve. The two are separate now,
            all the way through to the panel, so it tells you which kind of wait
            you’re in for.
          </Text>

          <Text is='p'>
            A plate takes much longer than any request should, so generation is
            asynchronous. The query returns whatever exists right now, and a
            GraphQL subscription pushes the finished plate when it lands.
            Requests are rate limited per day. The API sits behind a proxy and
            takes no public callers at all, so everything arrives carrying an
            identity token minted by the site rather than by the browser.
          </Text>
        </section>

        <section>
          <Heading is='h2' className='kicl-font-size-large'>
            What I gave up
          </Heading>

          <Text is='p'>
            The poster shows every tip at once, illustrated, on a single sheet.{' '}
            <HyperLink to={toVersionPath({ version: VERSION })}>
              v{VERSION}
            </HyperLink>{' '}
            shows you one taxon, its lineage back to the origin, and a sampled
            fan of its neighbours. The thing that makes the poster beautiful is
            exactly the thing 2.3 million tips won’t let you have.
          </Text>

          <Text is='p'>
            Three smaller compromises came with that. Illustrations are made on
            demand instead of drawn in advance, so most taxa have no plate until
            someone visits them and a provider has quota going spare. Deep fans
            are sampled rather than drawn whole, so what you get is
            representative, not complete. And the tree is assembled lazily from
            a cache sitting in front of a public API, which makes the first
            visit to an unexplored clade slow in a way a printed sheet never is.
          </Text>

          <Text is='p'>
            What survived is the part I cared about most. You can{' '}
            <HyperLink to={toVersionPath({ version: VERSION })}>
              start at the origin of life
            </HyperLink>{' '}
            and walk to any organism alive, and the walk itself tells you how
            far it is.
          </Text>
        </section>
      </article>
    </Layout>
  );
};

export default Article;
