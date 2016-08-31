'use strict';

import { Resource } from '@/component/component';

const Link = ReactRouter.Link;

class Logo extends React.Component {
	constructor() {
		super();

		this.state = {
			resource : {}
		};

		this.resource = new Resource(this.resourceData.bind(this));
	}

	resourceData (data) {
		this.setState({
			resource : data.component.logo
		});
	}

	componentWillMount () {
		
	}

	render () {
		return (
			{template}
		);
	}
}

export default Logo;