'use strict';

import { State } from '@/helper/helper';

const Route = ReactRouter.Route;

const SiteComponent = React.createClass({
  render() {
    return (
      <section className='site'>
        <h3>Keni</h3>
        <p>This is site</p>
      </section>
    )
  }
})

class Site {
  constructor() {
    return <Route path='site' component={ SiteComponent } onEnter={ State.enter } onChange={ State.change } onLeave={ State.leave } />
  }
}

export default new Site();

export { SiteComponent as Component };