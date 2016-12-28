'use strict';

class BroadcastResource {
	constructor (name, type, resource) {
		if (!resource) {
			return;
		}

		this.eventName = type;
		
		if (name) {
			this.eventName = `${name}.${type}`;
		}

		this.resource = resource;

		this.broadcast();

		window.addEventListener('state.enter', this.broadcast.bind(this));
	}

	broadcast () {
		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			Object.keys(this.resource).forEach(propName => {
				let eventName = `${this.eventName}.${propName}.resource`;

				window.dispatchEvent(
					new CustomEvent(eventName, { detail: this.resource[propName] })
				);
			});

			window.dispatchEvent(
				new CustomEvent(`${this.eventName}.resource`, { detail: this.resource })
			);
		}, 100);
	}
}

class Resource {
	constructor () {}

	success (resource) {
		this.resource = resource;

		Object.keys(this.resource).forEach(
			type => new BroadcastResource(this.name, type, this.resource[type])
		);

		if (!this.callback) {
			return;
		}

		this.callback(this.resource);
	}

	error (error) {

	}

	progress (result) {

	}

	load () {
		$.ajax({ url : this.url })
			.then(
				this.success.bind(this),
				this.error.bind(this),
				this.progress.bind(this)
			);
	}
}

export default Resource;