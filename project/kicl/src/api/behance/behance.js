(function behance () {
	'use strict';

	var dependency = [
			'behance.factory',
			'behance.service',
			'behance.component'
		];

	angular
		.module('behance', dependency)
		.constant('behanceResource', 'api/behance/data/resource.json')
		.run([
			'$rootScope', '$http', 'behanceReference', 'behanceResource',
			function run (root, http, reference, resource) {
				reference.resource.loader = http({ url : resource });

				reference.resource.loader.success(reference.callback.resource);
			}
		]);
}());
