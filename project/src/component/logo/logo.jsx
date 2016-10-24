'use strict';

import { ComponentState } from '@/helper/helper';

const Link = ReactRouter.Link;

class Logo extends React.Component {
	constructor() {
		super();

		this.state = {
			resource : {}
		};
	}

	resourceData (event) {
		this.updateState({ resource : event.detail });
	}

	componentWillMount () {
		this.updateState = ComponentState.update.bind(this);

		window.addEventListener('component.logo.resource', this.resourceData.bind(this));
	}

	componentWillUnmount () {
		window.removeEventListener('component.logo.resource', this.resourceData);
	}

	render () {
		return (
			{template}
		);
	}
}

export default Logo;