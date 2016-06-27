'use strict';

import { State } from '@/helper/helper';

const Route = ReactRouter.Route;

const WorkComponent = React.createClass({
  setStyle(event) {
    this.setState((previousState, currentProps) => {
      return $.extend(true, {}, previousState, {
        style: event.detail.style.main
      });
    });
  },

  componentWillMount() {
    this.state = {};

    window.addEventListener('view.style', this.setStyle, false);
  },

  componentWillUnmount() {
    window.removeEventListener('view.style', this.setStyle, false);
  },

  render() {
    return (
      <section className='work' style={ this.state.style }>
        <h2>Work</h2>
      </section>
    )
  }
})

class Work {
  constructor() {
    return <Route path='work' component={ WorkComponent } onEnter={ State.enter } onChange={ State.change } onLeave={ State.leave } />;
  }
}

export default new Work();

export { WorkComponent as Component };