import React, { useId } from 'react';

// Library
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { HyperLink, List, ListItem, Text } from 'design/components';

// Constants
import { ROOT_NODE_ID } from '@/views/experiments/tree-of-life/constants';
import { toVersionPath } from '@/views/experiments/tree-of-life/versions/constants';
import { type Era as Props } from './constants';

// The label sits under its numbers, as a caption; the list is named by it, so a screen reader hears it first.
const Era: React.FunctionComponent<Props> = ({ context, versions }) => {
  const { t } = useTranslation('tree-of-life');
  const id = useId();

  return (
    <ListItem gap='none'>
      <List
        is='ol'
        aria-labelledby={id}
        autoFlow='column'
        justifyContent='start'
        gap='narrow'
      >
        {versions.map((version) => (
          <ListItem key={version}>
            <HyperLink
              className={classNames(
                'kicl-font-family-mono',
                'kicl-font-size-medium'
              )}
              to={toVersionPath({ version, nodeId: ROOT_NODE_ID })}
            >
              {version.padStart(2, '0')}
            </HyperLink>
          </ListItem>
        ))}
      </List>
      <Text id={id} dense className='kicl-font-size-small'>
        {t('era', { context })}
      </Text>
    </ListItem>
  );
};

export { Era };
