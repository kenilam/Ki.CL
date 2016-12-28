'use strict';

import {
	ComponentState
} from '@/helper/helper';

import { AnimationLayer } from '@/component/component';

const Link = ReactRouter.Link;

class Navigation extends React.Component {
	constructor () {
		super();

		this.state = {
			style : {}
		};
	}

	updateSizes () {
		const ul = $(this._element).children('ul');

		this.updateState({ style : {
			height : ul.outerHeight(),
			width : ul.outerWidth()
		}});
	}

	componentWillMount () {
		this.updateState = ComponentState.update.bind(this);
	}

	componentDidMount () {
		if (!this.props.wrapSizes) {
			return;
		}

		new ResizeSensor(this._element, this.updateSizes.bind(this));

		this.updateSizes();
	}

	render() {
		return (
			{template}
		);
	}
}

export default Navigation;