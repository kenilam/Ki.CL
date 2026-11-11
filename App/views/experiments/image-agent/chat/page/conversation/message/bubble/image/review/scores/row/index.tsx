import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { ListItem, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useMessageContext } from '@/views/experiments/image-agent/chat/page/conversation/message/context';

// Constants
import { ROWS } from '@/views/experiments/image-agent/chat/page/conversation/message/bubble/image/review/scores/constants';

type Props = { score: (typeof ROWS)[number]['key'] };

const Row: React.FunctionComponent<Props> = ({ score: key }) => {
  const { t } = useTranslation('image-agent');
  const { score } = useMessageContext().message;
  const row = ROWS.find((each) => {
    return each.key === key;
  });

  if (!score || !row) {
    return null;
  }

  return (
    <ListItem autoFlow='column' display='grid' frames='auto--max-content'>
      <Text is='span'>{t('label', { context: row.context })}</Text>
      <Text
        dense
        is='span'
        className={classNames('kicl-font-family-mono', 'kicl-color-grey-700')}
      >
        {String(score[key])}
      </Text>
    </ListItem>
  );
};

export { Row };
