'use strict';

const CSSTransitionGroup = React.addons.CSSTransitionGroup;

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
		this.setState({
			isExpanded : !this.state.isExpanded
		}, this.setClass);
	}

	handleClick () {
		this.toggle(this.setClass);
	}

	stateEnter () {
		this.setState({
			isExpanded : false
		}, this.setClass);

		clearTimeout(this.timer);
		this.timer = setTimeout(this.forceUpdate.bind(this));
	}

	componentWillMount () {
		this.setState({
			isExpanded : !this.props.isExpanded
		}, this.toggle);

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