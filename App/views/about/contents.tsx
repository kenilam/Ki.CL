import React from 'react';

import classNames from 'classnames';

import { Chapters } from './chapters';
import { Provider } from './active/context';
import { Footer } from './footer';
import { Intro } from './intro';
import { Provider as Ready } from './ready/context';
import { Stage } from './stage';

import { CLASS_NAME } from './constants';

const About: React.FunctionComponent = () => {
  return (
    <Provider>
      <Ready>
        <Stage />
        <div
          className={classNames(
            CLASS_NAME,
            'kicl-inline-size-full',
            'kicl-padding-inline-frame-columns-12',
            'kicl-position-relative'
          )}
        >
          <Intro />
          <Chapters />
        </div>
        <Footer />
      </Ready>
    </Provider>
  );
};

export { About };
