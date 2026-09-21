import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, HyperLink, Layout, Text } from '@/Components';

// Styles
import './Styles.scss';

// Catalog
import { ATTRIBUTION } from '@/Views/Experiments/MusicVisualiser/Catalog';

// Constants
import {
  ARTICLE_ID,
  CLASS_NAME as HOME,
} from '@/Views/Experiments/MusicVisualiser/Home/constants';

const CLASS_NAME = `${HOME}__article`;

/** How it was made: the music, the picture, the data, and the address. */
const Article: React.FunctionComponent = () => (
  <Layout autoFlow='row' gap='wider' justifyItems='stretch'>
    <article className={classNames(CLASS_NAME, 'kicl-position-relative')}>
      {/*
       * The banner's chevron links here. HyperLink centres a hash target, so
       * the target sits half a screen down: centring it brings the article's
       * top to the top of the screen.
       */}
      <span
        aria-hidden
        className={classNames(
          `${CLASS_NAME}__anchor`,
          'kicl-position-absolute'
        )}
        id={ARTICLE_ID}
      />
      <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
        <header>
          <Heading is='h2' className='kicl-font-size-large'>
            What this is
          </Heading>
          <Text is='p'>
            A small experiment I made for fun. Put a lo-fi track on and the
            screen moves with it. There’s no machine learning and no server
            doing the work: the browser listens to the track, and a shader draws
            from what it hears.
          </Text>
        </header>
      </Layout>

      <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
        <section>
          <Heading is='h2' className='kicl-font-size-large'>
            The music
          </Heading>
          <Text is='p'>
            The tracks are{' '}
            <HyperLink to={ATTRIBUTION.url} target='_blank' rel='noreferrer'>
              Open Lo-Fi
            </HyperLink>
            , 166 pieces Bilal Tahir generated with Suno and released into the
            public domain. I copied them into the site’s own storage bucket and
            serve them from this address. A page can only analyse audio from its
            own origin, or from a server that says it may, so streaming from
            someone else’s host would have played fine and drawn nothing.
          </Text>
          <Text is='p'>
            I looked at Audius and Jamendo first, for the bigger catalogues. The
            machines I built this on couldn’t reach either of them, so I went
            with a collection I could host.
          </Text>
          <Text is='p'>
            Before that, the page wrote its own music: a synth playing chords
            and a melody from a seed, over a sampled piano. It was a lot of code
            to keep one station going, and the piano samples never made it into
            the bucket, so I took it out.
          </Text>
        </section>
      </Layout>

      <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
        <section>
          <Heading is='h2' className='kicl-font-size-large'>
            The picture
          </Heading>
          <Text is='p'>
            Everything on screen is one fragment shader. It holds thirteen
            scenes (pools, clouds, rings, bars, a tunnel, a hive, a bloom and
            more) and blends between two at a time. Each frame the page reads
            the analyser for a handful of numbers: overall energy, how much sits
            in the low, mid and high bands, how bright the sound is, and whether
            a note just landed. Those, and a 128-band spectrum passed in as a
            texture, are all the shader gets.
          </Text>
          <Text is='p'>
            A scene stays for 24 to 38 seconds, less if the music moves into a
            new section, and the cut waits up to two and a half seconds for a
            note so it lands on one. Which scene comes next is random, and each
            track gets its own camera drift and a warmer or cooler lean. An
            earlier version picked scenes by genre; I dropped that to keep the
            code small.
          </Text>
          <Text is='p'>
            The colours come from the stylesheet: six inks over a paper colour,
            per theme, with a Bayer dither over the top so it matches the home
            page.
          </Text>
        </section>
      </Layout>

      <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
        <section>
          <Heading is='h2' className='kicl-font-size-large'>
            Where the data comes from
          </Heading>
          <Text is='p'>
            The rest of this site talks to its backend over GraphQL. This page
            doesn’t. The catalogue is a list compiled into the page, and the
            audio comes from the bucket through the site’s{' '}
            <code>/assets/static</code> route. A GraphQL query for the next
            track was the plan while Audius was, and it can come back with a
            bigger catalogue.
          </Text>
        </section>
      </Layout>

      <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
        <section>
          <Heading is='h2' className='kicl-font-size-large'>
            The address is the player
          </Heading>
          <Text is='p'>
            <code>/play</code> on the end of a track’s address means it’s
            playing. Pause is a link back to the track, and skip is a link to
            the next one, picked as soon as the current one starts. Back and
            forward work, and a copied link opens on the same track.
          </Text>
          <Text is='p'>
            Browsers won’t make sound before you’ve clicked something, so a{' '}
            <code>/play</code> link opened from outside lands on the track’s
            page and waits for one press. When a track changes, the old one
            keeps playing until the new one has loaded, then they cross over
            three seconds.
          </Text>
        </section>
      </Layout>
    </article>
  </Layout>
);

export default Article;
