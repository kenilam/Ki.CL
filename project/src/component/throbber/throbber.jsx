'use strict';

import { ComponentState } from '@/helper/helper';

import { AnimationLayer } from '@/component/component';

import Spinner from './spinner/spinner';

const CSSTransitionGroup = React.addons.CSSTransitionGroup;

class Throbber extends React.Component {
	constructor () {
		super();

		this.spinner = <Spinner key={0} />;
		this.span = <span key={1}/>;

		this.state = {
			content : this.spinner
		};
	}

	setHidden (hidden) {
		const classNameProps = {};

		classNameProps.isHidden = hidden;
		classNameProps[this.props.eventName] = true;

		this.className = classNames(classNameProps);

		clearTimeout(this.timer);
		this.timer = setTimeout(this.forceUpdate.bind(this));
	}

	componentWillMount () {
		this.updateState = ComponentState.update.bind(this);

		this.updateState({
			content : this.props.show ? this.spinner : this.props.content || this.span
		});

		this.setHidden(!this.props.show);

		window.addEventListener(`${this.props.eventName}.throbber.show`, this.show.bind(this));
		window.addEventListener(`${this.props.eventName}.throbber.hide`, this.hide.bind(this));
	}

	componentWillUnmount () {
		window.removeEventListener(`${this.props.eventName}.throbber.show`, this.show.bind(this));
		window.removeEventListener(`${this.props.eventName}.throbber.hide`, this.hide.bind(this));
	}

	shown () {
		window.dispatchEvent(new Event(`${this.props.eventName}.throbber.shown`));
	}

	hidden () {
		window.dispatchEvent(new Event(`${this.props.eventName}.throbber.hidden`));
	}

	show () {
		clearTimeout(this.showTimer);
		this.showTimer = setTimeout(() => {
			this.updateState({ content : this.spinner }, this.shown);
			this.setHidden(false);
		}, 100);
	}

	hide () {
		clearTimeout(this.hideTimer);
		this.hideTimer = setTimeout(() => {
			this.updateState({ content : this.props.content || this.span }, this.hidden);
			this.setHidden(true);
		}, 100);
	}

	render () {
		return (
			{template}
		);
	}
}

export default Throbber;