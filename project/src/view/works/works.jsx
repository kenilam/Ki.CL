'use strict';

import {
	State,
	ComponentState
} from '@/helper/helper';

import {Projects} from '@/api/behance/behance';

import Index from './index/index';
import Work from './work/work';

import {
	AnimationLayer
} from '@/component/component';

const Route = ReactRouter.Route;
const cloneElement = React.cloneElement;

const WorksComponent = React.createClass({
	getInitialState () {
		return {
			currentProject : {},
			message : '',
			projects : [],
			resource : {},
			style : {}
		};
	},

	setProjects (event) {
		this.updateState({
			projects : event.detail.projects
		}, this.setProject);
	},

	setProject (event) {
		if (!this.state.projects) {
			return;
		}

		let currentProject = this.state.projects.filter(project => {
			return project.id.toString() === (
				(event ? event.detail.nextState.params : this.props.params).work
			);
		})[0];

		if (!currentProject) {
			return;
		}

		this.updateState({
			currentProject : currentProject
		});
	},

	resourceData (event) {
		this.updateState({
			resource : event.detail
		});

		window.dispatchEvent(new Event('global.throbber.hide'));
	},

	componentWillMount () {
		this.updateState = ComponentState.update.bind(this);
		
		this.setProject();

		window.addEventListener('state.enter', this.setProject, false);
		window.addEventListener('api.behance.projects.data', this.setProjects);
		window.addEventListener('view.works.resource', this.resourceData);
	},

	componentWillUnmount () {
		window.removeEventListener('state.enter', this.setProject);
		window.removeEventListener('api.behance.projects.data', this.setProjects);
		window.removeEventListener('view.works.resource', this.resourceData);
	},

	render () {
		return (
			{template}
		);
	}
});

class Works {
	constructor () {
		return <Route
			path='works'
			component={WorksComponent}
			onEnter={State.enter}
			onChange={State.change}
			onLeave={State.leave}
		>
			{Index}
			{Work}
		</Route>;
	}
}

export default new Works();

export {WorksComponent as Component};