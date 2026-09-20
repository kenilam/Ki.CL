import React from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import { Ri } from '@/Icons';

// Hooks
import { useResponsive } from '@/Hooks';

// Components
import {
  Heading,
  HyperLink,
  Layout,
  List,
  ListItem,
  Separator,
  Text,
} from '@/Components';

// Styles
import './Styles.scss';

// Constants
import { PATH as EXPERIMENTS } from '@/Views/Experiments/constants';
import { PATH as TREE_OF_LIFE } from '@/Views/Experiments/TreeOfLife/constants';
import { toPath as toMusicVisualiserPath } from '@/Views/Experiments/MusicVisualiser/constants';

const CLASS_NAME = 'kicl--views--experiments__home';

const COPY = {
  eyebrow: 'Ki.CL',
  lede: 'Things built to see what happens. Each one is a small world of its own; open one and stay a while.',
  title: 'Experiments',
};

/** The experiments, in the order they are shown, each with where it lives. */
const EXPERIMENTS_LIST = [
  {
    description:
      'Every living thing on one globe, drawn from the Open Tree of Life. Start at the origin of life and walk to any species alive now; every organism you pass has a portrait drawn for it.',
    title: 'Tree of Life',
    to: `/${EXPERIMENTS}/${TREE_OF_LIFE}`,
  },
  {
    description:
      'A radio for slow music, drawn as it plays. Chill, lo-fi and piano, chosen at random one after another, and a picture that answers the sound and changes as the music moves.',
    title: 'Music Visualiser',
    to: toMusicVisualiserPath(),
  },
];

/**
 * The index of the experiments: a title, a line, and one row a piece, the
 * whole row a link. Numbered, so the list reads as a list and not a grid
 * of cards; the row lights its title and moves its arrow when pointed at.
 */
const Home: React.FunctionComponent = () => {
  const { isTablet } = useResponsive();

  return (
    <Layout gap='none' justifyItems='center'>
      <div className={CLASS_NAME}>
        <Layout autoFlow='row' gap='narrow' justifyItems='start'>
          <header className={`${CLASS_NAME}__header`}>
            <Text
              is='p'
              dense
              variant='secondary'
              className='kicl-font-size-small kicl-text-transform-uppercase'
            >
              {COPY.eyebrow}
            </Text>
            <Heading
              is='h1'
              dense
              className={
                isTablet ? 'kicl-font-size-larger' : 'kicl-font-size-huge'
              }
            >
              {COPY.title}
            </Heading>
            <Text
              is='p'
              dense
              variant='secondary'
              className={classNames(
                `${CLASS_NAME}__lede`,
                'kicl-font-size-medium'
              )}
            >
              {COPY.lede}
            </Text>
          </header>
        </Layout>

        <List is='ol' className={`${CLASS_NAME}__list`} gap='none'>
          {EXPERIMENTS_LIST.map((experiment, index) => (
            <ListItem className={`${CLASS_NAME}__item`} key={experiment.to}>
              <Separator />
              <HyperLink
                className={`${CLASS_NAME}__link`}
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
                          'kicl-font-size-larger'
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
                    <Ri.RiArrowRightUpLine
                      aria-hidden
                      className={`${CLASS_NAME}__arrow`}
                    />
                  </span>
                </Layout>
              </HyperLink>
              {index === EXPERIMENTS_LIST.length - 1 ? <Separator /> : null}
            </ListItem>
          ))}
        </List>
      </div>
    </Layout>
  );
};

export default Home;
