'use strict';

import { ComponentState } from '@/helper/helper';
import { AnimationLayer } from '@/component/component';

import Thumbnail from './thumbnail/thumbnail';

class Projects extends React.Component {
	constructor () {
		super();

		this.state = {
			resource : {},
			content : <span key={0} />
		};
	}

	projectsData (event) {
		this.timer = setTimeout(() => {
			this.updateState({
				content : <div key={1}>
					<Thumbnail route={this.props.route} list={event.detail.projects} />
				</div>
			});
		}, 1000);
	}

	resourceData (event) {
		this.updateState({ resource : event.detail });
	}

	componentWillMount () {
		this.updateState = ComponentState.update.bind(this);

		window.addEventListener('api.behance.projects.data', this.projectsData.bind(this));
		window.addEventListener('api.behance.component.projects.resource', this.resourceData.bind(this));

		window.dispatchEvent(new CustomEvent('api.behance.load.data', {detail : 'projects'}));
	}

	componentWillUnmount () {
		window.removeEventListener('api.behance.projects.data', this.projectsData);
		window.removeEventListener('api.behance.component.projects.resource', this.resourceData);
	}

	render () {
		return (
			{template}
		);
	}
}

export default Projects;