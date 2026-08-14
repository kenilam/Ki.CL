import React from 'react';

// Library
import classNames from 'classnames';

// Components
import { HyperLink, Layout, Text } from '@/Components';

// Constants
import { ROOT_NODE_ID } from '@/Views/Experiments/TreeOfLife/constants';
import { toVersionPath } from '@/Views/Experiments/TreeOfLife/Versions/constants';
import { ERAS } from './constants';

const CLASS_NAME = 'kicl--views--experiments--tree-of-life__attempts';

const Attempts: React.FunctionComponent = () => {
  return (
    <Layout justifyContent='start' className='kicl-position-relative'>
      <nav className={CLASS_NAME} aria-label='Every version of this view'>
        <Text
          is='span'
          lookLike='h3'
          dense
          className={classNames('kicl-font-family-mono')}
        >
          Fifteen attempts:
        </Text>
        <Layout autoFlow='row' justifyContent='start' gap='narrow'>
          <ul>
            {ERAS.map(({ label, versions }) => (
              <li key={label}>
                <Layout autoFlow='column' justifyContent='start' gap='narrow'>
                  <ol>
                    {versions.map((version) => (
                      <li key={version}>
                        <HyperLink
                          className={classNames(
                            'kicl-font-family-mono',
                            'kicl-font-size-medium'
                          )}
                          to={toVersionPath({ version, nodeId: ROOT_NODE_ID })}
                        >
                          {version.padStart(2, '0')}
                        </HyperLink>
                      </li>
                    ))}
                  </ol>
                </Layout>

                <Text dense className='kicl-font-size-small'>
                  {label}
                </Text>
              </li>
            ))}
          </ul>
        </Layout>
      </nav>
    </Layout>
  );
};

export default Attempts;
