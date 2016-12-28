'use strict';

import {
	State,
	ComponentState
} from '@/helper/helper';

const Route = ReactRouter.Route;

const ContactComponent = React.createClass({
	getInitialState: function() {
		return {
			resource : {
				message : ''
			}
		};
	},

	resourceData (event) {
		this.updateState({ resource : event.detail });
	},

	componentWillMount () {
		this.updateState = ComponentState.update.bind(this);

		this.updateState({ route : location.hash.split('?')[0] });

		window.addEventListener('view.contact.resource', this.resourceData);
	},

	componentWillUnmount () {
		window.removeEventListener('view.contact.resource', this.resourceData);
	},

	render () {
		return (
			{template}
		);
	}
});

class Contact {
	constructor () {
		return <Route
			path='contact'
			component={ContactComponent}
			onEnter={State.enter}
			onChange={State.change}
			onLeave={State.leave}
		/>;
	}
}

export default new Contact();

export {ContactComponent as Component};