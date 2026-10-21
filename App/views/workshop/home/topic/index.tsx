import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  HyperLink,
  Layout,
} from 'design/components';

// Constants
import { TOPICS } from '@/views/workshop/home/constants';

type TopicProps = (typeof TOPICS)[number];

/** A topic's card: its icons in a triangle, its name and what it covers. */
const Topic: React.FunctionComponent<TopicProps> = ({
  context,
  icons: [Top, Left, Right],
  to,
}) => {
  const { t } = useTranslation('workshop');
  const { t: common } = useTranslation();

  return (
    // A row of the list each for its picture, title and description, shared
    // with the card beside it.
    <Card
      className='kicl-grid-row-span-3 kicl-grid-template-rows-subgrid'
      is='li'
    >
      <Layout
        alignContent='center'
        gap='narrow'
        justifyContent='center'
        justifyItems='center'
      >
        <div
          aria-hidden
          className={classNames(
            'kicl-aspect-ratio-video',
            'kicl-background-color-black-pure',
            'kicl-border-radius-sm',
            'kicl-color-white',
            'kicl-font-size-larger',
            'kicl-inline-size-full'
          )}
        >
          <Top />
          <Layout autoFlow='column' gap='narrow'>
            <span>
              <Left />
              <Right />
            </span>
          </Layout>
        </div>
      </Layout>
      <CardHeader
        className={classNames(
          'kicl-grid-row-span-2',
          'kicl-grid-template-rows-subgrid'
        )}
      >
        <CardTitle is='h2'>
          <HyperLink to={to}>{common(context)}</HyperLink>
        </CardTitle>
        <CardDescription>{t('description', { context })}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export { Topic };
