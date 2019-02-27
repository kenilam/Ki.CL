// @flow
import React from 'react';
import autobind from 'autobind-decorator';

import { randomId } from 'Helper';

import { Navigation } from 'Component';

import { Item } from 'View/Works/Component';

import './style';

type Props = {
  data?: Array
};

const { cancelAnimationFrame, requestAnimationFrame } = window;

class List extends React.PureComponent<Props> {
  static defaultProps = {
    data: []
  };

  componentDidMount() {
    this.scrollMonitor();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.scrollWatcher);
  }

  ref;

  scrollTop;

  scrollWatcher;

  @autobind
  scrollMonitor() {
    const {
      document: {
        scrollingElement: { scrollTop }
      }
    } = window;

    if (scrollTop !== this.scrollTop) {
      console.log(scrollTop);
      this.scrollTop = scrollTop;
    }

    this.scrollWatcher = requestAnimationFrame(this.scrollMonitor);
  }

  render() {
    const { data } = this.props;

    return (
      <Navigation>
        <ul ref={node => (this.ref = node)}>
          {data.map(project => (
            <Item project={project} key={randomId()} />
          ))}
        </ul>
      </Navigation>
    );
  }
}

export default List;
