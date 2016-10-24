'use strict';

import {
	ComponentState,
	State
} from '@/helper/helper';

import Content from './content/content';

import {
	AnimationLayer
} from '@/component/component';

const IndexRoute = ReactRouter.IndexRoute;

const IndexComponent = React.createClass({
	getInitialState () {
		return {};
	},

	resourceData (event) {
		this.updateState({ content : this.content });

		window.dispatchEvent(new CustomEvent('view.index.content.resource', { detail : event.detail }));
	},

	componentWillMount () {
		this.updateState = ComponentState.update.bind(this);

		this.content = <Content key={0} />;
		this.span = <span key={1}/>;

		this.updateState({ content : this.span });

		window.addEventListener('view.resource', this.resourceData);
	},

	componentWillUnmount () {
		window.removeEventListener('view.resource', this.resourceData);
	},

	render () {
		return (
			{template}
		);
	}
});

class Index {
	constructor () {
		return <IndexRoute
			component={IndexComponent}
			onEnter={State.enter}
			onChange={State.change}
			onLeave={State.leave}
		/>;
	}
}

export default new Index();

export {IndexComponent as Component};