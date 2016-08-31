'use strict';

import {State} from '@/helper/helper';
import {
	AnimationLayer,
	Logo,
	Navigation,
	Throbber
} from '@/component/component';

const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const CSSTransitionGroup = React.addons.CSSTransitionGroup;

const IndexContents = React.createClass({
	render () {
		return (
			<div>
				<img className='hero' src={this.props.resource.hero} />
				<Logo/>
				<Navigation list={
					[
						{ name: 'About', route: '/about' },
						{ name: 'Work', route: '/work' }
					]
				} />
			</div>
		);
	}
});

const IndexComponent = React.createClass({
	getInitialState () {
		return {
			resource : {}
		};
	},

	renderContents (resource) {
		let hero = new Image();

		hero.onload = event => {
			this.setState({
				resource : {
					contents : <IndexContents resource={this.resource} />
				}
			});
		};

		hero.src = this.resource.hero;
	},

	updateState (event) {
		if (!this.updater.isMounted(this)) {
			return;
		}

		this.resource = event.detail;
		this.renderContents();
	},

	componentDidMount () {
		window.addEventListener('resource.view.index', event => {
			this.updateState(event);
		});
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