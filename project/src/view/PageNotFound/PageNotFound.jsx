'use strict';

import {
	State,
	ComponentState
} from '@/helper/helper';

const Route = ReactRouter.Route;

const PageNotFoundComponent = React.createClass({
	getInitialState: function() {
		return {
			resource : {
				message : ''
			}
		};
	},

	setStyle (event) {
		this.updateState({ style : event.detail.style.main });
	},

	resourceData (event) {
		this.updateState({ resource : event.detail });
	},

	componentWillMount () {
		this.updateState = ComponentState.update.bind(this);

		this.updateState({ route : location.hash.split('?')[0] });

		window.addEventListener('view.pageNotFound.resource', this.resourceData);
		window.addEventListener('view.style', this.setStyle, false);
	},

	componentWillUnmount () {
		window.removeEventListener('view.pageNotFound.resource', this.resourceData);
		window.removeEventListener('view.style', this.setStyle);
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