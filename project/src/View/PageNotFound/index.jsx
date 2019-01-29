// @flow
import React from 'react';

import { interpolate, randomId } from 'Helper';

import resources from 'content/resources';

const { path, content } = resources.view.PageNotFound;

const PageNotFound = ({ location }) => (
  <main>
    <h1>{ interpolate(content.message, location) }</h1>
  </main>
);

export { path };
export default { exact: true, render: PageNotFound, key: randomId() };
