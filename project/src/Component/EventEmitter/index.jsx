'use strict';

class EventEmitter extends Emitter {
	constructor () {
		super();

		this.setMaxListeners(30);
	}
}

export default new EventEmitter();