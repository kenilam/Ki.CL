'use strict';

import {
	State,
	ComponentState
} from '@/helper/helper';

import Index from './index/index';
import Me from './me/me';
import Site from './site/site';

import {
	AnimationLayer,
	Navigation
} from '@/component/component';

const Route = ReactRouter.Route;
const cloneElement = React.cloneElement;

const AboutComponent = React.createClass({
	getInitialState () {
		return {
			style : {}
		};
	},

	setStyle (event) {
		this.updateState({ style : event.detail.style.main });
	},

	componentWillMount () {
		this.updateState = ComponentState.update.bind(this);
		
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

class About {
	constructor () {
		return <Route
			path='about'
			component={AboutComponent}
			onEnter={State.enter}
			onChange={State.change}
			onLeave={State.leave}
		>
			{Index}
			{Me}
			{Site}
		</Route>;
	}
}

export default new About();

export {AboutComponent as Component};