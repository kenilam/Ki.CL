(function experience () {
	'use strict';

	var controller = [
			'$rootScope', '$scope', 'behanceReference', 'behanceModify',
			function controller (root, scope, reference, modify) {
				var loader = {},
					control = {
						get : {
							experience : function () {
								var then = function (data) {
									loader.resolved = data.$resolved;

									callback.data(data);
								};

								if (!loader.promise) {
									loader.promise = reference.api.experience().$promise;
								}

								loader.promise.then(then);
							}
						}
					},
					callback = {
						data : function (data) {
							reference.component.experience.resolved = data.$resolved;

							scope.experience.list = _.map(data.work_experience, modify.experience);

							root.$broadcast('behance.experience.data', scope.experience);
						}
					};

				scope.experience = {};
				
				scope.experience.content = reference.resource.data.widget.experience.content;

				control.get.experience();
			}
		];

	function directive (async) {
		return {
			restrict: 'E',
			replace: true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'api/behance/component/experience/experience.html',
			controller : controller
		};
	}

	angular.module('behance.component.experience', [])
		.directive('behanceExperience', [
			'async',
			directive
		]);
}());
