import React from 'react';

// Libraries
import classNames from 'classnames';

// Hooks
import { useResponsive } from '@/Hooks';

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

/**
 * The index of the experiments: a title, and one full-width band
 * a piece, the whole band a link. Behind each band its plate drifts more
 * slowly than the page as it scrolls, on a scroll-driven animation the
 * stylesheet declares, so there is no scroll handler and nothing moves for
 * a reader who has asked for less motion. The band lights its title when
 * pointed at.
 */
const Home: React.FunctionComponent = () => {
  const { isTablet } = useResponsive();

  return (
    <Layout gap='none' justifyItems='stretch'>
      <div className={CLASS_NAME}>
        <Layout autoFlow='row' gap='narrow' justifyItems='start'>
          <header className={`${CLASS_NAME}__header`}>
            <Heading
              is='h1'
              dense
              className={
                isTablet ? 'kicl-font-size-larger' : 'kicl-font-size-huge'
              }
            >
              {COPY.title}
            </Heading>
          </header>
        </Layout>

        <List is='ol' className={`${CLASS_NAME}__list`} gap='none'>
          {EXPERIMENTS_LIST.map((experiment, index) => (
            <ListItem
              className={classNames(
                `${CLASS_NAME}__item`,
                `${CLASS_NAME}__item--${experiment.plate}`,
                'kicl-position-relative'
              )}
              key={experiment.to}
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
                  `${CLASS_NAME}__link`,
                  'kicl-position-relative'
                )}
                to={experiment.to}
                unstyled
              >
                <Layout
                  alignItems='baseline'
                  autoFlow='column'
                  gap='wide'
                  justifyContent='space-between'
                >
                  <span className={`${CLASS_NAME}__row`}>
                    <Text
                      is='span'
                      dense
                      variant='secondary'
                      className={classNames(
                        `${CLASS_NAME}__number`,
                        'kicl-font-size-small'
                      )}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </Text>
                    <span className={`${CLASS_NAME}__body`}>
                      <Heading
                        is='h2'
                        dense
                        className={classNames(
                          `${CLASS_NAME}__title`,
                          isTablet
                            ? 'kicl-font-size-large'
                            : 'kicl-font-size-larger'
                        )}
                      >
                        {experiment.title}
                      </Heading>
                      <Text
                        is='p'
                        dense
                        variant='secondary'
                        className={classNames(
                          `${CLASS_NAME}__description`,
                          'kicl-font-size-small'
                        )}
                      >
                        {experiment.description}
                      </Text>
                    </span>
                  </span>
                </Layout>
              </HyperLink>
            </ListItem>
          ))}
        </List>
      </div>
    </Layout>
  );
};

export default Home;
