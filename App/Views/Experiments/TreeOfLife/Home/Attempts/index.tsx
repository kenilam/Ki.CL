import React from 'react';

// Components
import { HyperLink, Text } from '@/Components';

// Constants
import { ROOT_NODE_ID } from '@/Views/Experiments/TreeOfLife/constants';
import { toVersionPath } from '@/Views/Experiments/TreeOfLife/Versions/constants';
import { ERAS } from './constants';

// Styles
import './Styles.scss';

/**
 * The index of attempts.
 *
 * Fifteen whole tries at the same problem is the most unusual thing about this
 * experiment, and until now fourteen of them were reachable only by finding
 * their number inside a paragraph. Here they are the structure: numbered,
 * because they genuinely are a sequence, and banded, because the sequence has
 * three turns in it.
 *
 * Every one opens at the origin — the only node all fifteen are certain to
 * hold.
 */

const CLASS_NAME = 'kicl--views--experiments--tree-of-life__attempts';

const Attempts: React.FunctionComponent = () => {
  return (
    <nav className={CLASS_NAME} aria-label='Every version of this view'>
      <Text
        is='span'
        dense
        className={`${CLASS_NAME}__eyebrow kicl-font-family-mono kicl-font-size-small`}
      >
        Fifteen attempts
      </Text>

      {ERAS.map(({ label, versions }) => (
        <div key={label} className={`${CLASS_NAME}__era`}>
          <ol className={`${CLASS_NAME}__run`}>
            {versions.map((version) => (
              <li key={version}>
                <HyperLink
                  unstyled
                  className={`${CLASS_NAME}__attempt kicl-font-family-mono kicl-font-size-medium`}
                  to={toVersionPath({ version, nodeId: ROOT_NODE_ID })}
                >
                  {version.padStart(2, '0')}
                </HyperLink>
              </li>
            ))}
          </ol>

          <Text
            is='span'
            dense
            className={`${CLASS_NAME}__label kicl-font-size-small`}
          >
            {label}
          </Text>
        </div>
      ))}
    </nav>
  );
};

export default Attempts;
