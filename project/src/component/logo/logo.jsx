'use strict';

const Link = ReactRouter.Link;

class Logo extends React.Component {
	constructor() {
		super();

		this.state = {
			resource : {}
		};

		this.eventHandler();
	}

	eventHandler () {
		window.addEventListener('component.logo.resource', this.resourceData.bind(this));
	}

	resourceData (event) {
		this.setState({
			resource : event.detail
		});
	}

	render () {
		return (
			{template}
		);
	}
}

export default Logo;