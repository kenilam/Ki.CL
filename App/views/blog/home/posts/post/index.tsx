import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  HyperLink,
} from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Views
import { Published } from '@/views/blog/published';

// Constants
import { POSTS, type Post as Data } from '@/views/routes';

type Props = Pick<Data, 'to'>;

const Post: React.FunctionComponent<Props> = ({ to }) => {
  const { t } = useTranslation('blog');
  const post = POSTS.find((each) => {
    return each.to === to;
  });

  if (!post) {
    return null;
  }

  const { context } = post;

  return (
    <Card
      className={classNames(
        'kicl-grid-row-span-3',
        'kicl-grid-template-rows-subgrid'
      )}
      is='li'
    >
      <CardHeader
        className={classNames(
          'kicl-grid-row-span-3',
          'kicl-grid-template-rows-subgrid'
        )}
      >
        <CardTitle is='h2'>
          <HyperLink to={to}>{t('title', { context })}</HyperLink>
        </CardTitle>
        <Published to={to} />
        <CardDescription>{t('description', { context })}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export { Post };
