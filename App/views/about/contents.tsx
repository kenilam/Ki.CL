import React from 'react';

import classNames from 'classnames';

import { Provider } from '@/views/active/context';
import { Footer } from '@/views/footer';
import { Menu } from '@/views/menu';
import { Provider as Ready } from '@/views/ready/context';
import { Stage } from '@/views/stage';

import { Chapters } from './chapters';
import { Intro } from './intro';

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
        <Footer>
          <Menu />
        </Footer>
      </Ready>
    </Provider>
  );
};

export { About };
