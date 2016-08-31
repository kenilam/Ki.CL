'use strict';

import {State} from '@/helper/helper';

const Route = ReactRouter.Route;

const PageNotFoundComponent = React.createClass({
	setStyle (event) {
		this.setState((previousState, currentProps) => {
			return $.extend(true, {}, previousState, { style : event.detail.style.main });
		});
	},

	resourceData (event) {
		if (!event.detail) {
			return;
		}
		
		this.setState({
			resource : event.detail
		});
	},

	componentWillMount () {
		this.state = {};

		this.setState({
			route : location.hash.split('?')[0]
		});

		this.resourceData({
			detail : window.kicl.resource ? window.kicl.resource.view.pageNotFound : false
		});

		window.addEventListener('view.pageNotFound.resource', this.resourceData);
		window.addEventListener('view.style', this.setStyle, false);
	},

	componentWillUnmount () {
		window.removeEventListener('view.style', this.setStyle, false);
	},

	render () {
		return (
			{template}
		);
	}
});

class PageNotFound {
	constructor () {
		return <Route
			path='*'
			component={PageNotFoundComponent}
			onEnter={State.enter}
			onChange={State.change}
			onLeave={State.leave}
		/>;
	}
}

export default new PageNotFound();

export {PageNotFoundComponent as Component};