'use strict';

import { ComponentState } from '@/helper/helper';

const Link = ReactRouter.Link;

class Logo extends React.Component {
	constructor() {
		super();

		this.state = {
			resource : {}
		};
	}

	resourceData (event) {
		this.updateState({ resource : event.detail });
	}

	componentWillMount () {
		this.updateState = ComponentState.update.bind(this);

		window.addEventListener('component.logo.resource', this.resourceData.bind(this));
	}

	componentDidMount () {
		const element = this._element;
		const logo = $(element);

		const appRoot = document.querySelector('[data-reactroot]');

		logo.bind('mouseover touchstart', () => {

			let route = element.getAttribute('data-route');

			if (route === '/') {
				route = 'index';
			}

			appRoot.setAttribute('data-route-to-be', route);
			element.classList.add('hasFocus');
		});

		logo.bind('mouseout mouseup touchend', () => {

			let route = element.getAttribute('data-route');

			if (route === '/') {
				route = 'index';
			}

			appRoot.removeAttribute('data-route-to-be');
			element.classList.remove('hasFocus');
		});
	}

	componentWillUnmount () {
		window.removeEventListener('component.logo.resource', this.resourceData);
	}

	render () {
		return (
			{template}
		);
	}
}

export default Logo;