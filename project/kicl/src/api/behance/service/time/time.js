(function time () {
	'use strict';

	var service = [
		function service () {
			var timeObject;

			function mmmmyyyy () {
				return timeObject.format('MMMM, YYYY');
			}

			function datetime () {
				return timeObject.format('YYYY-MM-DD');
			}

			function fromNow (suffix) {
				return timeObject.fromNow(!suffix);
			}

			function transform (stamp) {
				timeObject = moment(stamp * 1000);

				return {
					mmmmyyyy : mmmmyyyy,
					datetime : datetime,
					fromNow : fromNow
				};
			}

			this.transform = transform;
		}
	];

	angular.module('behance.service.time', [])
		.service('behanceTime', service);
}());
