(
	function init (app) {
		'use strict';

		app
		.service('globalFooter_link',
		[
			'$rootScope',
			'resize',
			function link (root, resize) {
				function init (scope, elm) {
					function whenInit (resource) {
						scope.globalFooter = {
							resize : resize('globalFooter', scope, elm),
							watcher : {
								navigation : scope.$broadcast('navigation', {
									navigation : _.rest(resource.content)
								})
							}
						};

						scope.$broadcast('navigation', {
							navigation : _.rest(resource.content)
						});
					}

					return whenInit;
				}

				function trigger (scope, elm) {
					root.resource.$promise.then(init(scope, elm));
				}

				return trigger;
			}
		]
	)
	.directive('globalFooter',
	[
		'globalFooter_link',
		function directive (link) {
			return {
				restrict: 'AE',
				replace: true,
				templateUrl: 'partial/globalFooter.html',
				link: link
			};
		}
	]
);
}
)(kicl);
