// @flow
import React from 'react';

import { randomId } from 'Helper';
import { Logo, Navigation } from 'Component';

import resources from 'content/resources';

import './style.scss';

const { view } = resources;
const { path, content } = view.home;

const Home = () => {
  return (
    <main>
      <Logo/>
      <h2>{ content.heading }</h2>
      <p>{ content.description }</p>
      <Navigation/>
    </main>
  );
}

Home.defaultProps = { content };

export default { exact: true, path, render: Home, key: randomId() };
