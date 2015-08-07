(function project () {
	'use strict';

	var controller = [
			'$rootScope', '$scope', '$timeout', '$stateParams', 'behanceReference', 'behanceCheck', 'behanceModify',
			function controller (root, scope, timeout, stateParams, reference, check, modify) {
				var loader = {},
					control = {
						get : {
							project : function () {
								var then = function (data) {
									loader.resolved = data.$resolved;

									callback.data(data);
								};

								if (!stateParams.project) {
									return;
								}

								loader = reference.component.project[stateParams.project] = {};

								if (!loader.promise) {
									loader.promise = reference.api.project().$promise;
								}

								loader.promise.then(then);
							}
						}
					},
					callback = {
						data : function (data) {
							scope.resource = reference.resource.data.widget.project;

							scope.project = modify.project(check.project(data.project));

							root.$broadcast('behance.project.data', scope.project);
						}
					};

				control.get.project();
			}
		];

	function directive (async) {
		return {
			restrict: 'E',
			replace: true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'api/behance/component/project/project.html',
			controller : controller
		};
	}

	angular.module('behance.component.project', [])
		.directive('behanceProject', [
			directive
		]);
}());
