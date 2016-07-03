'use strict';

import {Logo, Navigation} from '@/component/component';
import {State} from '@/helper/helper';

const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;

const HomeComponent = React.createClass({
	render () {
		return (
			{template}
		);
	}
});

class Home {
	constructor () {
		return <IndexRoute
			component={HomeComponent}
			onEnter={State.enter}
			onChange={State.change}
			onLeave={State.leave}
		/>;
	}
}

export default new Home();

export {HomeComponent as Component};