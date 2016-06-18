'use strict';

class state {
	constructor () {

	}

	stateEnter (nextState, transition, callback) {
		window.dispatchEvent(new CustomEvent(
			'stateEnter',
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

	stateChange (prevState, nextState, replace, callback) {
		window.dispatchEvent(new CustomEvent(
			'stateChange',
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

	stateLeave () {
		window.dispatchEvent(new CustomEvent(
			'stateLeave',
			{
				detail: {
					_this: this
				}
			}
		));
	}
}