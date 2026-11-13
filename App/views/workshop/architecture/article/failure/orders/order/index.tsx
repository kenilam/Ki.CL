import React from 'react';

// Components
import { ListItem, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { ORDERS } from '@/views/workshop/architecture/article/failure/orders/constants';

type Props = { order: (typeof ORDERS)[number] };

const Order: React.FunctionComponent<Props> = ({ order }) => {
  const { t } = useTranslation('architecture');

  return (
    <ListItem>
      <Text is='span'>{t(`article.failure.${order}`)}</Text>
    </ListItem>
  );
};

export { Order };
