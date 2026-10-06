import React from 'react';

// Components
import {
  CardDescription,
  CardHeader,
  CardTitle,
  Layout,
} from 'design/components';

const COPY = {
  denied:
    'This account can’t open this piece. Sign in with the credentials you were given for it.',
  description:
    'This piece is shared with a small audience. Sign in with the credentials you were given.',
  title: 'Private portfolio',
};

type Props = {
  /** Signed in, but without access to this piece. */
  denied?: boolean;
};

const Header: React.FunctionComponent<Props> = ({ denied = false }) => (
  <Layout gap='narrow' justifyItems='center'>
    <CardHeader className='kicl-text-align-center'>
      {/* The page's only heading, kept at the card title's size. */}
      <CardTitle className='kicl-font-size' is='h1'>
        {COPY.title}
      </CardTitle>
      <CardDescription>
        {denied ? COPY.denied : COPY.description}
      </CardDescription>
    </CardHeader>
  </Layout>
);

export { Header };
