'use strict';

import {
	ComponentState,
	State
} from '@/helper/helper';

import {
	AnimationLayer,
	GlobalFooter,
	GlobalHeader,
	Throbber
} from '@/component/component';

import About from './about/about';
import Contact from './contact/contact';
import Index from './index/index';
import PageNotFound from './pageNotFound/pageNotFound';
import Works from './works/works';

const cloneElement = React.cloneElement;
const Route = ReactRouter.Route;

const ViewComponent = React.createClass({
	getInitialState () {
		const bleed = 0;
		const route = location.hash.split('?')[0].replace('#', '').replace(/\//g, '.').replace('.', '');
		
		return {
			style : {
				main : {
					paddingTop : !route ? false : bleed,
					minHeight : !route ? '100%' : window.innerHeight - bleed
				},
				globalHeader : {
					height : bleed
				},
				globalFooter : {
					height : bleed
				}

			},
			route : route || 'index',
			rootRoute : this.props.location.pathname.split('/')[1]
		};
	},

	broadcastStyle () {
		window.dispatchEvent(new CustomEvent(
			'view.style',
			{
				detail: {
					style : this.state.style
				}
			}
		));
	},

	setResizeStyle () {
		let headerHeight = this.state.style.globalHeader.height;
		let footerHeight = this.state.style.globalFooter.height;
		let minHeight = window.innerHeight - footerHeight;
		
		let style = {};

		if (this.props.location.pathname === '/') {
			headerHeight = 0;
			footerHeight = 0;
			minHeight = '100%';
		}

		style.main = {};
		style.main.paddingTop = headerHeight;
		style.main.minHeight = minHeight;

		if (this.props.location.pathname === '/') {
			style.main.paddingTop = null;
		}

		this.updateState({ style: style }, this.broadcastStyle);
	},

	setStyle (elementName, property, execute) {
		const exec = () => {
			let style = {};

			style[elementName] = {};
			style[elementName][property] = event.detail[property];

			this.updateState({ style: style }, this.setResizeStyle);
		};

		if (execute) {
			return exec();
		}

		return exec;
	},

	setRoute (event) {
		const pathname = (
			event ? event.detail.nextState.location.pathname : this.props.location.pathname
		).replace('.', '').replace(/\//g, '.');
		
		let route = (pathname === '.' || !pathname ? 'index' : pathname);

		if (route[0] === '.') {
			route = route.substr(1);
		}

		clearTimeout(this.routeTimer);
		this.routeTimer = setTimeout(() => {
			this.updateState({
				route : route
			});
		}, 100);

		this.updateState({
			rootRoute : route.split('.')[0]
		});
	},

	stateEnter (event) {
		this.setRoute(event);

		window.dispatchEvent(new Event('global.throbber.hide'));
	},

	componentWillMount () {
		this.updateState = ComponentState.update.bind(this);

		this.setGlobalHeaderHeight = this.setStyle('globalHeader', 'height');
		this.setGlobalFooterHeight = this.setStyle('globalFooter', 'height');

		this.setRoute();
		
		window.addEventListener('globalHeader.height', this.setStyle('globalHeader', 'height'));
		window.addEventListener('globalFooter.height', this.setStyle('globalFooter', 'height'));
		window.addEventListener('resize', this.setResizeStyle);
		window.addEventListener('state.enter', this.stateEnter);
	},

	componentWillUnmount () {
		window.removeEventListener('globalHeader.height', this.setGlobalHeaderHeight);
		window.removeEventListener('globalFooter.height', this.setGlobalFooterHeight);
		window.removeEventListener('resize', this.setResizeStyle);
		window.removeEventListener('state.enter', this.stateEnter);
	},

	render () {
		return (
			{template}
		);
	}
});

class View {
	constructor () {
		return <Route
			path='/'
			component={ViewComponent}
			onEnter={State.enter}
			onChange={State.change}
			onLeave={State.leave}
		>
			{Index}
			{About}
			{Works}
			{Contact}
			{PageNotFound}
		</Route>;
	}
}

export default new View();

