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
  next: 'Next',
  open: 'See the experience',
};

/**
 * The experiments, in the order they are shown, each with where it lives
 * and which plate sits behind it - a modifier the stylesheet paints.
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
      'A radio for slow music, drawn as it plays. Chill, lo-fi and piano, chosen at random one after another, and a picture that answers the sound and changes as the music moves.',
    plate: 'music-visualiser',
    title: 'Music Visualiser',
    to: toMusicVisualiserPath(),
  },
];

/** The screens that share the stage: one an experiment. */
const SCREENS = EXPERIMENTS_LIST.length;

/**
 * The index of the experiments: one full screen a piece, the title set
 * huge across it over its plate. The screens sit stacked in one stage
 * that stays put while the page scrolls a screen's height for each. The
 * words move at the scroll's own pace, so each heading rides in from
 * below as the last rides out above, as any page would read; only the
 * plates behind them change, the next fading in over the last, in place,
 * and drifting as it does. Each screen carries its own link in, under
 * the words. The scroll drives it all from the stylesheet,
 * so there is no scroll handler; where the browser has no scroll
 * timelines, or the reader wants less motion, the screens simply follow
 * one another down the page. After the stage, in the page's own flow, a
 * last word says more will come, with a link to keep.
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
            {EXPERIMENTS_LIST.map((experiment, index) => (
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
                  <Layout alignContent='end' autoFlow='row' gap='narrow'>
                    <span className={`${CLASS_NAME}__body`}>
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
                        {`No. ${index + 1}`}
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
                {COPY.next}
              </Text>
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
