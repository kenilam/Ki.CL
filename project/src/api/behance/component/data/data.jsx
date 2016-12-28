'use strict';

class Data {
	constructor () {
		this.resource = {};

		window.addEventListener('api.behance.load.data', this.emit.bind(this));
	}

	emit (event) {
		this.load(event.detail);
	}

	broadcast (service) {
		window.dispatchEvent(new CustomEvent(
			['api', 'behance', service, 'data'].join('.'),
			{
				detail: this.resource[service]
			}
		));
	}

	success (service) {
		return resource => {
			this.resource[service] = resource;
			this.broadcast(service);
		};
	}

	error (service) {
		return err => window.dispatchEvent(
			new CustomEvent(
				['api', 'behance', service, 'data', 'error'].join('.'),
				{
					detail: this.resource[service]
				}
			)
		);
	}

	progress (result) {

	}

	load (service) {
		if (this.resource[service]) {
			clearTimeout(this.broadcastTimer);

			this.broadcastTimer = setTimeout(
				() => this.broadcast(service), 250
			);
			
			return;
		}

		$.ajax({
			url : `http://localhost:8888/api/behance/data/${service.replace('.', '/')}`,
			type : 'GET',
			dataType : 'jsonp',
			jsonp : 'callback',
			crossDomain: true
		})
		.done(this.success(service).bind(this))
		.fail(this.error(service).bind(this));
	}
}

export default Data;