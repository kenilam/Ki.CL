class Resource {
	constructor (callback) {
		if (window.kicl) {
			return;
		}

		window.kicl = {};

		this.load(callback);
	}

	success (resource) {
		Object.defineProperty(window.kicl, 'resource', {
			value : resource,
			enumerable : false,
			writable : false,
			configurable : false
		});

		if (!this.callback) {
			return;
		}

		this.callback(window.kicl.resource);
	}

	error (error) {

	}

	progress (result) {

	}

	load (callback) {
		this.callback = callback;

		if (window.kicl.resource && this.callback) {
			this.callback(window.kicl.resource);

			return;
		}

		return $.ajax({ url : 'data/resource.json' })
			.then(
				this.success.bind(this),
				this.error.bind(this),
				this.progress.bind(this)
			);
	}
}

export default Resource;