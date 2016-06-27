'use strict';

import {State} from '@/helper/helper';

const IndexRoute = ReactRouter.IndexRoute;
const Route = ReactRouter.Route;

const IndexComponent = React.createClass({
	render () {
		return (
			{template}
		)
	}
})

class Index {
	constructor () {
		return <IndexRoute
			component={IndexComponent}
			onEnter={State.enter}
			onChange={State.change}
			onLeave={State.leave}
		/>;
	}
}

export default new Index();

export {IndexComponent as Component};