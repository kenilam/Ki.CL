import React from 'react';

// Components
import { CardDescription, CardHeader, CardTitle } from '@/components';

const COPY = {
  description:
    'This piece is shared with a small audience. Sign in with the credentials you were given.',
  title: 'Private portfolio',
};

const Header: React.FunctionComponent = () => (
  <CardHeader>
    <CardTitle>{COPY.title}</CardTitle>
    <CardDescription>{COPY.description}</CardDescription>
  </CardHeader>
);

export { Header };
