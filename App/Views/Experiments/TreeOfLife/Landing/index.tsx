import React from 'react';

// Components
import { Heading, HyperLink, Image, Layout, Text } from '@/Components';

// Constants
import { ROOT_NODE_ID } from '@/Views/Experiments/TreeOfLife/constants';
import { toVersionPath } from '@/Views/Experiments/TreeOfLife/Versions/constants';

// Partials
import Banner from './Banner';

// Styles
import './Styles.scss';

/**
 * What this experiment is, and how it got here.
 *
 * The bare path used to redirect straight onto the origin of life, which threw
 * a visitor into a 3D scene with no idea what they were looking at. The work is
 * more interesting than that: fifteen attempts at the same problem, a cache
 * standing in front of a public API, and a pipeline that draws organisms nobody
 * has photographed.
 */

const CLASS_NAME = 'kicl--views--experiments--tree-of-life--landing';
const IMAGES = '/images/tree-of-life';

const Landing: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='row' gap='none' fullScreen>
      <div className={CLASS_NAME}>
        <Banner />

        <article className={`${CLASS_NAME}__article`}>
          <section>
            <Heading is='h2'>Where it started</Heading>

            <Text is='p'>
              The starting point was{' '}
              <HyperLink
                to='https://observablehq.com/@d3/tree-of-life'
                target='_blank'
                rel='noreferrer'
              >
                D3’s Tree of Life
              </HyperLink>{' '}
              — a radial dendrogram with curved links, tips labelled around the
              circumference, branch lengths carrying real distance. It answers
              the structural question completely: it shows you the shape of a
              phylogeny and how far apart its members sit.
            </Text>

            <Text is='p'>
              What it deliberately does not do is tell you what any of them look
              like. Every tip is a name. That gap — between a diagram that knows
              the structure and a poster that knows the organisms — is the whole
              of this experiment.
            </Text>
          </section>

          <section>
            <Heading is='h2'>The picture we were chasing</Heading>

            <Text is='p'>
              This is the thing we wanted to build. Every branch of life on one
              sheet, and at the end of every branch an organism you can actually
              recognise — a horse, a nautilus, a fly agaric — so that the shape
              of the tree and the creatures it produced are the same picture.
            </Text>

            <figure>
              <Image
                data={`${IMAGES}/original-vision.webp`}
                alt='A printed tree of life poster: coloured branches radiating from “Origin of life” at the base, each tip ending in a painted organism.'
              />
              <figcaption>
                <Text is='span' dense className={`${CLASS_NAME}__muted`}>
                  The reference we started from. Roughly 250 tips, every one
                  illustrated by hand.
                </Text>
              </figcaption>
            </figure>

            <Text is='p'>
              The Open Tree of Life has about 2.3 million tips. That single
              number is the source of nearly every decision that follows: you
              cannot draw them all, you cannot illustrate them all, and you
              cannot fetch them all. The interesting question stopped being “how
              do we draw the tree” and became “what do you show someone standing
              inside something that large”.
            </Text>
          </section>

          <section>
            <Heading is='h2'>Fifteen attempts</Heading>

            <Text is='p'>
              Each version is a whole attempt rather than a revision of the one
              before, which is why they are all still reachable. The early ones
              (v1–v8) drew into WebGL with the whole clade laid out at once and
              a cream backdrop borrowed from the poster. They looked like the
              reference and behaved nothing like it: past a few hundred taxa the
              layout collapsed into a mat of dots, and every one of them was the
              same handful of pixels wherever it sat.
            </Text>

            <Text is='p'>
              The middle versions (v9–v13) went the other way and became
              documents — DOM and SVG, tip-first, one clade at a time, drag and
              zoom instead of a fixed composition. They were legible and they
              were flat. You could read a name; you could not feel how far you
              were from the origin.
            </Text>

            <figure>
              <Image
                data={`${IMAGES}/v14.png`}
                alt='The v14 view: a wide, pale map of the tree with labelled nodes spread across the frame.'
              />
              <figcaption>
                <Text is='span' dense className={`${CLASS_NAME}__muted`}>
                  v14 — the map. Everything visible, nothing emphasised.
                </Text>
              </figcaption>
            </figure>

            <Text is='p'>
              v14 was the widest of them and made the trade explicit: showing
              everything means emphasising nothing. v15 gave that up. It frames
              one taxon and its immediate neighbourhood, treats the rest as
              context that fades into the air behind it, and lets the route —
              not a viewport — decide what you are looking at.
            </Text>
          </section>

          <section>
            <Heading is='h2'>What the backend actually does</Heading>

            <Text is='p'>
              Open Tree answers questions about subtrees, not about
              neighbourhoods. Ask it for a node and you get what hangs below
              that node, to a height limit — which means the node you asked
              about arrives with no parent attached. Store that naively and you
              have written down that a genus is the root of all life.
            </Text>

            <Text is='p'>
              That is exactly what happened, and it took a while to see because
              the symptom was so far from the cause: <em>Panthera</em> rendered
              as the centre of the universe with nothing above it. The fix was
              to stop conflating “no parent” with “no parent yet”. A cold fetch
              now also pulls the node’s rootward lineage — the whole spine back
              to the origin, including the unnamed internal nodes the synthetic
              tree strings between named ranks — so a stored null means the
              origin and nothing else.
            </Text>

            <Text is='p'>
              Everything is cached in MongoDB as a parent-pointer model: each
              node stores only its own ancestor, and children are a reverse
              lookup. Writes are idempotent upserts, because lineages that share
              ancestors are written concurrently and two requests will race for
              the same row — which they did, loudly, the first time the database
              was emptied.
            </Text>
          </section>

          <section>
            <Heading is='h2'>Drawing organisms nobody photographed</Heading>

            <Text is='p'>
              Most of those 2.3 million tips are bacteria, archaea and unnamed
              internal nodes. There is no photograph of “uncultured Crater Lake
              bacterium CL500-11”. So the plates are generated, and the style
              target is a 19th-century hand-coloured lithograph — the same
              register as the reference below.
            </Text>

            <figure>
              <Image
                data={`${IMAGES}/perrot-1854.jpg`}
                alt='A hand-coloured 1854 natural-history plate by Perrot: animals arranged across a pale staged ground with fine engraved linework.'
              />
              <figcaption>
                <Text is='span' dense className={`${CLASS_NAME}__muted`}>
                  Perrot, 1854. Fine engraved linework, muted washes, a plain
                  staged ground — what every generated plate is aiming at.
                </Text>
              </figcaption>
            </figure>

            <Text is='p'>
              The pipeline is fixed rather than agentic in the loose sense: it
              resolves the lineage, picks one concrete living specimen to stand
              for the taxon, writes a prompt from that specimen’s morphology,
              generates an image, and then has a vision model score what came
              back. If the score fails, the prompt is tightened and it tries
              once more.
            </Text>
          </section>

          <section>
            <Heading is='h2'>Tuning the reviewer</Heading>

            <Text is='p'>
              The scoring turned out to matter more than the generating. For a
              long stretch every plate in the library carried the same score —
              <code> overall 7, taxonMatch 7, pass true</code> — across more
              than a hundred images. That is not a model’s judgement, it is a
              hardcoded fallback: the vision provider had run out of credit, the
              call threw, and the pipeline substituted a passing score rather
              than admit it had not looked. A whole library shipped as
              “reviewed”.
            </Text>

            <Text is='p'>
              Three separate paths could invent that pass, and none of them was
              recorded, so nothing in the database could tell a real review from
              a fabricated one. Now a review that did not happen is stored as no
              review at all, and the scorer has its own provider chain so a
              single spent account cannot silence it.
            </Text>

            <Text is='p'>
              The rubric needed work too. It scored whether the organism was the
              right one and whether it matched a morphology lock, but nothing
              asked whether the anatomy was <em>possible</em> — so a human with
              its head at an impossible angle to the neck, malformed fingers and
              a garbled caption scored a comfortable pass on morphology. Anatomy
              is now judged separately from identity, which is what makes
              “correct species, broken body” sayable at all.
            </Text>

            <Text is='p'>
              Prompts are written as description, never as prohibition. Naming a
              thing to forbid it puts that thing in the conditioning: a ban list
              reading “no insects, no mites” produced microbes drawn as mites,
              and a fallback morphology ending “— not a macroscopic animal” was
              quietly doing the same to every microbe in the library.
            </Text>
          </section>

          <section>
            <Heading is='h2'>Quota, failover and the long wait</Heading>

            <Text is='p'>
              Generation runs across a chain of providers tried in order, each
              with its own bounded retries. A provider that reports a
              non-retryable limit is put in cooldown and skipped, so the next
              one gets its turn rather than the request dying. Text, images and
              vision each have their own chain.
            </Text>

            <Text is='p'>
              Not all exhaustion is the same, which took a while to admit. A
              daily allowance returns tomorrow; an empty balance returns when
              somebody pays. Treating both as a thirty-minute cooldown meant
              retrying a spent account forever, twice an hour, and telling the
              reader to “try again shortly” for something only a billing page
              could fix. The two are now distinguished all the way to the panel,
              which says which kind of wait it is.
            </Text>

            <Text is='p'>
              Because a plate takes far longer than a request should, generation
              is asynchronous: the query returns whatever exists now, and a
              GraphQL subscription pushes the result when it lands. Requests are
              rate limited per day, and the whole API sits behind a proxy — the
              service itself takes no public callers at all, so every request
              arrives carrying an identity token minted by the site rather than
              by the browser.
            </Text>
          </section>

          <section>
            <Heading is='h2'>What we gave up</Heading>

            <Text is='p'>
              The poster shows every tip at once, illustrated, on one sheet. v15
              shows one taxon, its lineage back to the origin, and a sampled fan
              of its neighbours. That is the trade, and it is not a small one —
              the thing that made the reference beautiful is precisely the thing
              2.3 million tips will not allow.
            </Text>

            <Text is='p'>
              Three smaller surrenders came with it. Illustrations are generated
              on demand rather than drawn in advance, so most taxa have no plate
              until somebody visits them and a provider has quota to spare. Deep
              fans are sampled rather than drawn whole, so what you see is
              representative rather than complete. And the tree is assembled
              lazily from a cache in front of a public API, so the first visit
              to an unexplored clade is slow in a way a printed sheet never is.
            </Text>

            <Text is='p'>
              What survived is the part worth keeping: you can start at the
              origin of life and walk to any organism, and the walk itself shows
              you how far it is.
            </Text>
          </section>

          <nav className={`${CLASS_NAME}__outro`}>
            <HyperLink
              lookLikeButton
              to={toVersionPath({ nodeId: ROOT_NODE_ID })}
            >
              Start at the origin of life
            </HyperLink>
          </nav>
        </article>
      </div>
    </Layout>
  );
};

export default Landing;
