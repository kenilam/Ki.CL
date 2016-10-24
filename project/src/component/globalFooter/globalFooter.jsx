'use strict';

import {Logo, Navigation} from '@/component/component';

class Globalefooter extends React.Component {
	constructor() {
		super();

		this.state = {};
	}

	broadcastHeight () {
		window.dispatchEvent(new CustomEvent(
			'globalFooter.height',
			{
				detail : {
					height : $(this._element).outerHeight()
				}
			}
		));
	}

	componentDidMount () {
		new ResizeSensor(this._element, this.broadcastHeight.bind(this));

		this.broadcastHeight();
	}

	render() {
		return (
			{template}
		);
	}
}

export default Globalefooter;