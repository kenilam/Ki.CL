(function () {
	'use strict';

	var controller = [
			'$rootScope', '$scope', 'behanceReference',
			function controller (root, scope, reference) {
				var callback = {
						data : function (data) {
							reference.component.experience.resolved = data.$resolved;
							reference.component.experience.list = _.map(data.work_experience, eachExperience);
						}
					}

				function eachExperience (experience) {
					var stamp = new Date(experience.start_date.split("-").reverse().join("-")).getTime();

					experience.start_date = moment(stamp).format('MMMM, YYYY');

					return experience;
				}

				if (!reference.component.experience.resolved) {
					reference.api.experience().$promise.then(callback.data);
				}

				scope.experience = reference.component.experience;
			}
		]

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
