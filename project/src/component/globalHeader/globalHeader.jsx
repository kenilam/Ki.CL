'use strict';

import {
	ComponentState
} from '@/helper/helper';

import {
	Logo,
	MenuButton,
	Navigation
} from '@/component/component';

let globaleHeaderTimer;

class GlobaleHeader extends React.Component {
	constructor () {
		super();

		this.state = {
			resource : {},
			navigation : []
		};
		
		this.className = classNames({
			globalHeader : true,
			isCollapsed : true
		});
	}

	broadcastHeight () {
		window.dispatchEvent(new CustomEvent(
			'globalHeader.height',
			{
				detail : {
					height : $(this._element).outerHeight(true)
				}
			}
		));
	}

	setClass () {
		this.className = classNames({
			globalHeader : true,
			isCollapsed : this.state.isCollapsed
		});

		clearTimeout(this.timer);
		this.timer = setTimeout(this.forceUpdate.bind(this));
	}

	toggleMenu (event) {
		this.updateState({ isCollapsed : !event.detail.expanded }, this.setClass);
	}

	resourceData (event) {
		this.updateState({
			resource : event.detail,
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
		});
	}

	componentWillMount () {
		this.updateState = ComponentState.update.bind(this);

		window.addEventListener('globalHeader.navigation', this.toggleMenu.bind(this));
		window.addEventListener('view.resource', this.resourceData.bind(this));
	}

	componentWillUnmount () {
		window.removeEventListener('globalHeader.navigation', this.toggleMenu);
		window.removeEventListener('view.resource', this.resourceData);
	}

	componentDidMount () {
		new ResizeSensor(this._element, this.broadcastHeight.bind(this));

		this.broadcastHeight();
	}

	render () {
		return (
			{template}
		);
	}
}

export default GlobaleHeader;