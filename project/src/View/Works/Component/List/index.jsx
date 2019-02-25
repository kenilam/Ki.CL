// @flow
import React from 'react';

import { randomId } from 'Helper';
import { Navigation } from 'Component';

import { Item } from './Component';

import './style';

const SCROLL_TO_VIEW_OPTIONS = {
  behavior: 'smooth',
  block: 'center',
  inline: 'center'
};

type Props = {
  data?: Array
};

const changeHandler = ({ inView, path }) => {
  if (!inView) {
    return;
  }

  console.log(path);

  // window.location.href = window.location.href.replace(
  //   window.location.hash,
  //   `#${path}`
  // );
};

const clickHandler = ({ inView, event }) => {
  if (inView) {
    return;
  }

  event.target.scrollIntoView(SCROLL_TO_VIEW_OPTIONS);
};

const List = ({ data }: Props) => (
  <Navigation>
    {data.map(project => (
      <Item
        project={project}
        key={randomId()}
        changeHandler={changeHandler}
        clickHandler={clickHandler}
      />
    ))}
  </Navigation>
);

List.defaultProps = {
  data: []
};

export default List;
