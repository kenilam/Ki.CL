import React from 'react';

// Routes
import { Route as Origin } from '@/Router';

const PATH = 'fishtank';

const FishTank: React.FunctionComponent = () => {
  return <section>Fish Tank</section>;
};

const Route = <Origin path={PATH} />;

export { PATH, Route };
export default <Origin path={PATH} element={<FishTank />} />;
