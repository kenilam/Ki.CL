import React from 'react';

// Components
import { Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { POSTS, type Post } from '@/views/routes';

type Props = Pick<Post, 'to'>;

const Published: React.FunctionComponent<Props> = ({ to }) => {
  const { i18n } = useTranslation();
  const post = POSTS.find((each) => {
    return each.to === to;
  });

  if (!post) {
    return null;
  }

  return (
    <Text
      className='kicl-font-family-mono'
      dateTime={post.published}
      dense
      is='time'
      variant='secondary'
    >
      {new Intl.DateTimeFormat(i18n.language, {
        dateStyle: 'long',
        timeZone: 'UTC',
      }).format(new Date(post.published))}
    </Text>
  );
};

export { Published };
