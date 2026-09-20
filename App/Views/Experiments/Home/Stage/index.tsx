import React, { useEffect, useRef, useState } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { List } from '@/Components';

// Partials
import Screen, { CLASS_NAME as SCREEN } from './Screen';

// Styles
import './Styles.scss';

// Constants
import {
  CLASS_NAME as HOME,
  EXPERIMENTS,
} from '@/Views/Experiments/Home/constants';

const CLASS_NAME = `${HOME}__stage`;

/** Newest first; the number shown keeps the order they were made in. */
const SCREENS = EXPERIMENTS.map((experiment, index) => ({
  ...experiment,
  number: index + 1,
})).reverse();

/**
 * A sticky stage, one screen tall, that stays pinned while the page
 * scrolls one screen height per panel. Screen does the per-panel motion.
 *
 * The push maths in Screen/Styles.scss need the text block's height. The
 * stylesheet guesses it; here the real blocks are measured and the tallest
 * is written back as the variable, so the push starts exactly when one
 * block meets the next whatever the fonts and viewport.
 */
const Stage: React.FunctionComponent = () => {
  const list = useRef<HTMLOListElement>(null);
  const [block, setBlock] = useState<number | null>(null);

  useEffect(() => {
    const words = list.current?.querySelectorAll<HTMLElement>(
      `.${SCREEN}__words`
    );

    if (!words?.length) {
      return;
    }

    const observer = new ResizeObserver(() => {
      let tallest = 0;

      words.forEach((node) => {
        tallest = Math.max(tallest, node.getBoundingClientRect().height);
      });

      setBlock(Math.ceil(tallest));
    });

    words.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`${CLASS_NAME}__scroll`}
      style={
        {
          '--kicl--views--experiments__home--screens': SCREENS.length,
          ...(block
            ? { '--kicl--views--experiments__home--block': `${block}px` }
            : {}),
        } as never
      }
    >
      <div className={classNames(CLASS_NAME, 'kicl-position-sticky')}>
        <List
          is='ol'
          className={`${CLASS_NAME}__list`}
          gap='none'
          ref={list as never}
        >
          {SCREENS.map((screen, index) => (
            <Screen
              experiment={screen}
              index={index}
              key={screen.to}
              number={screen.number}
              titleIs={index === 0 ? 'h1' : 'h2'}
            />
          ))}
        </List>
      </div>
    </div>
  );
};

export { CLASS_NAME };
export default Stage;
