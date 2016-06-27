'use strict';

import {State} from '@/helper/helper';

const Route = ReactRouter.Route;

const SiteComponent = React.createClass({
	render () {
		return (
			{template}
		)
	}
})

class Site {
	constructor () {
		return <Route
			path='site'
			component={SiteComponent}
			onEnter={State.enter}
			onChange={State.change}
			onLeave={State.leave}
		/>
	}
}

export default new Site();

export {SiteComponent as Component};