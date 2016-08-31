class BroadcastResource {
	constructor (type, resource) {
		if (!resource) {
			return;
		}

		this.type = type;
		this.resource = resource;
		this.broadcast();

		window.addEventListener('state.enter', this.broadcast.bind(this));
	}

	broadcast () {
		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			Object.keys(this.resource).forEach(name => {
				window.dispatchEvent(new CustomEvent(
					['resource', this.type, name].join('.'),
					{
						detail: this.resource[name]
					}
				));
			});
		}, 100);
	}
}

class Resource {
	constructor (callback) {
		if (callback) {
			this.callback = callback;
		}
	}

	success (resource) {
		this.resource = resource;

		new BroadcastResource('view', this.resource.view);
		new BroadcastResource('component', this.resource.component);

		if (!this.callback) {
			return;
		}

		this.callback(resource);
	}

	error (error) {

	}

	progress (result) {

	}

	load () {
		$.ajax({ url : 'data/resource.json' })
			.then(
				this.success.bind(this),
				this.error.bind(this),
				this.progress.bind(this)
			);
	}
}

export default Resource;