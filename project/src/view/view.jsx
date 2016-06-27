'use strict';

import {State} from '@/helper/helper';
import {
	GlobalFooter,
	GlobalHeader,
	Preloader
} from '@/component/component';

import About from './about/about';
import Index from './index/index';
import Work from './work/work';

const IndexRedirect = ReactRouter.IndexRedirect;
const Route = ReactRouter.Route;
const CSSTransitionGroup = React.addons.CSSTransitionGroup;
const cloneElement = React.cloneElement;

const ViewComponent = React.createClass({
	getInitialState () {
		const bleed = 0;
		const route = location.hash.split('?')[0].replace('#', '').replace(/\//g, '.').replace('.', '');

		const style = {
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
			route : route || 'index'
		}

		return style;
	},

	setLayoutStyle () {
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
		
		window.dispatchEvent(new CustomEvent(
			'view.style',
			{
				detail: {
					style : style
				}
			}
		));

		this.updateState({style: style}, true);
	},

	updateState (currentState, noCallback) {
		this.setState((previousState, currentProps) => {
			return $.extend(true, {}, previousState, currentState);
		}, !noCallback ? this.setLayoutStyle : null);
	},

	setStyle (elementName, property) {
		function setter (event) {
			let style = {};

			style[elementName] = {};
			style[elementName][property] = event.detail[property];

			this.updateState({style: style});
		}

		return setter.bind(this);
	},

	stateEnter (event) {
		const pathname = event.detail.nextState.location.pathname.replace(/\//g, '.').replace('.', '');
		const route = pathname || 'index';

		clearTimeout(this.stateEnterTimer);
		this.stateEnterTimer = setTimeout(() => {
			this.updateState({ route : route });
		}, 250);
	},

	componentWillMount () {
		window.addEventListener('globalHeader.height', this.setStyle('globalHeader', 'height'));
		window.addEventListener('globalFooter.height', this.setStyle('globalFooter', 'height'));
		window.addEventListener('resize', this.setLayoutStyle);
		window.addEventListener('state.enter', this.stateEnter);
	},

	componentWillUnmount () {
		window.removeEventListener('globalHeader.height', this.setGlobalHeaderHeight);
		window.removeEventListener('globalFooter.height', this.setGlobalFooterHeight);
		window.removeEventListener('resize', this.setLayoutStyle);
		window.removeEventListener('state.enter', this.stateEnter);
	},

	render () {
		return (
			{template}
		)
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
			{Work}
		</Route>;
	}
}

export default new View();

