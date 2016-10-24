'use strict';

import { ComponentState } from '@/helper/helper';

class Project extends React.Component {
	constructor () {
		super();

		this.state = {
			resource : {}
		};
	}

	updateProject (event) {

	}

	resourceData (event) {
		this.updateState({ resource : event.detail });
	}

	componentWillMount () {
		this.updateState = ComponentState.update.bind(this);

		window.addEventListener('api.behance.project.data', this.updateProject);
		window.addEventListener('api.behance.component.project.resource', this.resourceData.bind(this));
		
		window.dispatchEvent(new CustomEvent('api.behance.load.data', {detail : `projects.${this.props.project}`}));
	}

	componentWillUnmount () {
		window.removeEventListener('api.behance.project.data', this.updateProject);
		window.removeEventListener('api.behance.component.project.resource', this.resourceData.bind(this));
	}

	render () {
		return (
			{template}
		);
	}
}

export default Project;