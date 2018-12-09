// @flow
import React from 'react';

import IcoMoon from 'react-icomoon';

import { component } from 'content/resources';

import { debounce } from 'Helper';

const { content } = component.loader;

import './style.scss';

type Props = {
  iconOnly?: Boolean,
  text?: String
};

class Loader extends React.Component<Props> {
  async getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log(this, prevProps, prevState);
    debugger;
    await debounce(1000);

    debugger;
  }
  render() {
    const { iconOnly, text } = this.props;

    return (
      <p className='loader' aria-label={ text }>
        <IcoMoon
          className='spinner'
          icon='spinner8'
        />
        { !iconOnly && <span>{ text }</span> }
      </p>
    );
  }
}

Loader.defaultProps = {
  iconOnly: false,
  text: content.default.text
}

export default Loader;
