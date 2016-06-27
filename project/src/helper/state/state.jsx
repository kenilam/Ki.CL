'use strict';

class State {
	constructor () {

	}

	enter (nextState, transition, callback) {
		window.dispatchEvent(new CustomEvent(
			'state.enter',
			{
				detail: {
					nextState: nextState,
					transition: transition,
					_this: this
				}
			}
		));

		callback();
	}

	change (prevState, nextState, replace, callback) {
		window.dispatchEvent(new CustomEvent(
			'state.change',
			{
				detail: {
					prevState: prevState,
					nextState: nextState,
					replace: replace,
					callback: callback,
					_this: this
				}
			}
		));

		callback();
	}

	leave () {
		window.dispatchEvent(new CustomEvent(
			'state.leave',
			{
				detail: {
					_this: this
				}
			}
		));
	}
}

export default new State();