'use strict';

import { ComponentState } from '@/helper/helper';

class MenuButton extends React.Component {
	constructor () {
		super();

		this.state = {};
		this.className = classNames({ menuButton : true });
	}

	dispatchEvent () {
		if (!this.props.dispatchEvent) {
			return;
		}

		window.dispatchEvent(new CustomEvent(
			this.props.dispatchEvent,
			{
				detail: {
					expanded: this.state.isExpanded,
					_this: this
				}
			}
		));
	}

	setClass () {
		this.className = classNames({
			menuButton : true,
			isExpanded : this.state.isExpanded
		});

		this.dispatchEvent();
	}

	toggle () {
		this.updateState({ isExpanded : !this.state.isExpanded }, this.setClass);
	}

	handleClick () {
		this.toggle(this.setClass);
	}

	stateEnter () {
		this.updateState({ isExpanded : false }, this.setClass);

		clearTimeout(this.timer);
		this.timer = setTimeout(this.forceUpdate.bind(this));
	}

	componentWillMount () {
		this.updateState = ComponentState.update.bind(this);

		this.updateState({ isExpanded : !this.props.isExpanded }, this.toggle);

		clearTimeout(this.timer);
		this.timer = setTimeout(this.forceUpdate.bind(this));

		window.addEventListener('state.enter', this.stateEnter.bind(this));
	}

	componentWillUnmount () {
		window.removeEventListener('state.enter', this.stateEnter.bind(this));
	}

	render () {
		return (
			{template}
		);
	}
}

export default MenuButton;