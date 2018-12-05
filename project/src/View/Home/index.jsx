// @flow
import React from 'react';

const Home = ({ match }) => (
  <main role='main'>
    <h1>{ match.url }</h1>
  </main>
);

export default Home;
