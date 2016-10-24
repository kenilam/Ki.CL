'use strict';

import {State} from '@/helper/helper';

import {Project} from '@/api/behance/behance';

const Route = ReactRouter.Route;

const WorkComponent = React.createClass({
	render () {
		return (
			{template}
		);
	}
});

class Work {
	constructor () {
		return <Route
			path=':work'
			component={WorkComponent}
			onEnter={State.enter}
			onChange={State.change}
			onLeave={State.leave}
		/>;
	}
}

export default new Work();

export {WorkComponent as Component};