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

	setStyle (event) {
		this.updateState({ style : event.detail.style.main });
	},

	resourceData (event) {
		this.updateState({ resource : event.detail });
	},

	componentWillMount () {
		this.updateState = ComponentState.update.bind(this);

		this.updateState({ route : location.hash.split('?')[0] });

		window.addEventListener('view.contact.resource', this.resourceData);
		window.addEventListener('view.style', this.setStyle, false);
	},

	componentWillUnmount () {
		window.removeEventListener('view.contact.resource', this.resourceData);
		window.removeEventListener('view.style', this.setStyle);
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