'use strict';

import { ComponentState } from '@/helper/helper';

import {
	Base64Transparent,
	Logo,
	Navigation,
	Throbber
} from '@/component/component';

const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const Link = ReactRouter.Link;

const Content = React.createClass({
	getInitialState () {
		return {
			navigation : [],
			style : {}
		};
	},

	setStyle () {
		const body = $('body');
		const bodyHeight = body.outerHeight();
		const bodyWidth = body.outerWidth();

		const radius = bodyHeight / bodyWidth;

		const style = {};

		let size = Math.round((radius >= 1 ? bodyWidth : bodyHeight) * 0.8);

		if (size % 2) {
			size = size - 1;
		}

		size = `${size}px`;

		this.updateState({
			style : {
				height : size,
				width : size
			}
		});
	},

	resourceData (event) {
		let hero = new Image();

		hero.onload = () => {
			this.setStyle();

			this.updateState({
				navigation : Object.keys(event.detail).filter(name => {
					let view = event.detail[name];
					
					return !view.indexRoute && !view.disabledRoute;
				})
				.map(name => {
					let view = event.detail[name];

					return {
						route : view.route,
						name : view.name
					};
				})
			}, this.setClass);
		};

		hero.src = event.detail.index.hero;
	},

	componentWillMount () {
		this.updateState = ComponentState.update.bind(this);

		window.addEventListener('view.index.content.resource', this.resourceData);
		window.addEventListener('resize', this.setStyle);
	},

	componentWillUnmount () {
		window.removeEventListener('view.index.content.resource', this.resourceData);
		window.removeEventListener('resize', this.setStyle);
	},

	render () {
		return (
			{template}
		);
	}
});

export default Content;