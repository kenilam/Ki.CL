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
  moreLede: 'The next one lands here when it is ready.',
  next: 'Next',
  title: 'Experiments',
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

/** The screens in order: one an experiment, then the one that says more will come. */
const SCREENS = EXPERIMENTS_LIST.length + 1;

/**
 * The index of the experiments: one full screen a piece, the title set
 * huge across it over its plate, and after the last a screen that says
 * more will come. The screens sit stacked in one stage that stays put
 * while the page scrolls a screen's height for each; as the page passes
 * from one to the next, the next fades in over the last, in place, and
 * its plate drifts as it does. The scroll drives it all from the
 * stylesheet, so there is no scroll handler; where the browser has no
 * scroll timelines the screens simply follow one another down the page.
 */
const Home: React.FunctionComponent = () => (
  <Layout gap='none' justifyItems='stretch'>
    <div
      className={CLASS_NAME}
      style={{ '--kicl--views--experiments__home--screens': SCREENS } as never}
    >
      <div
        className={classNames(`${CLASS_NAME}__stage`, 'kicl-position-sticky')}
      >
        <Heading
          is='h1'
          dense
          className={classNames(
            `${CLASS_NAME}__heading`,
            'kicl-font-size-small',
            'kicl-position-absolute',
            'kicl-text-transform-uppercase'
          )}
        >
          {COPY.title}
        </Heading>

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
              <HyperLink
                className={classNames(
                  `${CLASS_NAME}__screen`,
                  'kicl-position-relative'
                )}
                to={experiment.to}
                unstyled
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
                      is='h2'
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
                  </span>
                </Layout>
              </HyperLink>
            </ListItem>
          ))}

          <ListItem
            className={classNames(
              `${CLASS_NAME}__item`,
              `${CLASS_NAME}__item--more`,
              'kicl-position-relative'
            )}
            style={
              {
                '--kicl--views--experiments__home--index':
                  EXPERIMENTS_LIST.length,
              } as never
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
                  <Text
                    is='p'
                    dense
                    className={classNames(
                      `${CLASS_NAME}__description`,
                      'kicl-font-size-small'
                    )}
                  >
                    {COPY.moreLede}
                  </Text>
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
          </ListItem>
        </List>
      </div>
    </div>
  </Layout>
);

export default Home;
