'use strict';

import {State} from '@/helper/helper';

const Route = ReactRouter.Route;

const MeComponent = React.createClass({
	render () {
		return (
			{template}
		);
	}
});

class Me {
	constructor () {
		return <Route
			path='me'
			component={MeComponent}
			onEnter={State.enter}
			onChange={State.change}
			onLeave={State.leave}
		/>;
	}
}

export default new Me();

export {MeComponent as Component};