import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, HyperLink, Layout, List, ListItem, Text } from '@/Components';

// Styles
import './Styles.scss';

// Constants
import { PATH as EXPERIMENTS } from '@/Views/Experiments/constants';
import { PATH as TREE_OF_LIFE } from '@/Views/Experiments/TreeOfLife/constants';
import { toPath as toMusicVisualiserPath } from '@/Views/Experiments/MusicVisualiser/constants';

const CLASS_NAME = 'kicl--views--experiments__home';

const COPY = {
  bookmark: 'Bookmark this page',
  more: 'More to come',
  open: 'See the experience',
};

/**
 * The experiments, numbered in the order they were made. `plate` picks the
 * background in Styles.scss.
 */
const EXPERIMENTS_LIST = [
  {
    description:
      'Every living thing on one globe, drawn from the Open Tree of Life. Start at the origin of life and walk to any species alive now; every organism you pass has a portrait drawn for it.',
    plate: 'tree-of-life',
    title: 'Tree of Life',
    to: `/${EXPERIMENTS}/${TREE_OF_LIFE}`,
  },
  {
    description:
      'Slow music, drawn as it plays. Chill, lo-fi and piano picked at random, with visuals that react to the sound.',
    plate: 'music-visualiser',
    title: 'Music Visualiser',
    to: toMusicVisualiserPath(),
  },
];

/** Newest first on the page; the numbers keep their order. */
const SCREENS_LIST = EXPERIMENTS_LIST.map((experiment, index) => ({
  ...experiment,
  number: index + 1,
})).reverse();

/** How many screens the pinned stage holds. */
const SCREENS = SCREENS_LIST.length;

/**
 * One full-screen panel per experiment, stacked in a stage that stays
 * pinned while the page scrolls one screen height per panel. Each panel's
 * text block rides up from below at the scroll rate and stops in place;
 * it only moves on when the next block reaches it and pushes it up. The
 * backgrounds crossfade underneath. All of it is CSS
 * scroll-driven animation (see Styles.scss), so there is no scroll
 * handler. Browsers without scroll timelines, and readers with reduced
 * motion, get the panels stacked vertically instead. The "more to come"
 * section sits after the stage in normal flow.
 */
const Home: React.FunctionComponent = () => (
  <Layout gap='none' justifyItems='stretch'>
    <div className={CLASS_NAME}>
      <div
        className={`${CLASS_NAME}__scroll`}
        style={
          { '--kicl--views--experiments__home--screens': SCREENS } as never
        }
      >
        <div
          className={classNames(`${CLASS_NAME}__stage`, 'kicl-position-sticky')}
        >
          <List is='ol' className={`${CLASS_NAME}__list`} gap='none'>
            {SCREENS_LIST.map((experiment, index) => (
              <ListItem
                className={classNames(
                  `${CLASS_NAME}__item`,
                  `${CLASS_NAME}__item--${experiment.plate}`,
                  'kicl-position-relative'
                )}
                key={experiment.to}
                style={
                  { '--kicl--views--experiments__home--index': index } as never
                }
              >
                <div
                  aria-hidden
                  className={classNames(
                    `${CLASS_NAME}__plate`,
                    'kicl-position-absolute'
                  )}
                />
                <div
                  className={classNames(
                    `${CLASS_NAME}__screen`,
                    'kicl-position-relative'
                  )}
                >
                  <Layout alignContent='end' autoFlow='row' gap='none'>
                    <span className={`${CLASS_NAME}__body`}>
                      <Layout alignContent='end' autoFlow='row' gap='narrow'>
                        <span className={`${CLASS_NAME}__words`}>
                          <Text
                            is='span'
                            dense
                            variant='secondary'
                            className={classNames(
                              `${CLASS_NAME}__index`,
                              'kicl-font-size-small',
                              'kicl-text-transform-uppercase'
                            )}
                          >
                            {`No. ${experiment.number}`}
                          </Text>
                          <Heading
                            is={index === 0 ? 'h1' : 'h2'}
                            dense
                            className={classNames(
                              `${CLASS_NAME}__title`,
                              'kicl-text-transform-uppercase'
                            )}
                          >
                            {experiment.title}
                          </Heading>
                          <Text
                            is='p'
                            dense
                            className={classNames(
                              `${CLASS_NAME}__description`,
                              'kicl-font-size-small'
                            )}
                          >
                            {experiment.description}
                          </Text>
                          <HyperLink
                            className={`${CLASS_NAME}__open`}
                            lookLikeButton
                            to={experiment.to}
                          >
                            {COPY.open}
                          </HyperLink>
                        </span>
                      </Layout>
                    </span>
                  </Layout>
                </div>
              </ListItem>
            ))}
          </List>
        </div>
      </div>

      <section
        className={classNames(`${CLASS_NAME}__more`, 'kicl-position-relative')}
      >
        <div className={`${CLASS_NAME}__screen`}>
          <Layout alignContent='end' autoFlow='row' gap='narrow'>
            <span className={`${CLASS_NAME}__body`}>
              <Heading
                is='h2'
                dense
                className={classNames(
                  `${CLASS_NAME}__title`,
                  'kicl-text-transform-uppercase'
                )}
              >
                {COPY.more}
              </Heading>
              <HyperLink
                className={`${CLASS_NAME}__bookmark`}
                lookLikeButton
                to={`/${EXPERIMENTS}`}
                variant='ghost'
              >
                {COPY.bookmark}
              </HyperLink>
            </span>
          </Layout>
        </div>
      </section>
    </div>
  </Layout>
);

export default Home;
