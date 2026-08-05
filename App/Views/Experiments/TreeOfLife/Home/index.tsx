import React from 'react';

// Partials
import Article from './Article';
import Banner from './Banner';

const Home: React.FunctionComponent = () => {
  return (
    <>
      <Banner />
      <Article />
    </>
  );
};

export default Home;
