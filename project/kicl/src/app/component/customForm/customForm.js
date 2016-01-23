(function form () {
	'use strict';

	var controller = [
			'$scope',
			'$attrs',
			function (scope, attr) {
				function submit () {
					
				}

				function reset () {
					scope.customForm.model = {};
				}

				function init (event, data) {
					scope.customForm.form = data;
				}

				scope.customForm = {};
				scope.customForm.model = {};
				scope.status = {};
				scope.status.loading = false;
				scope.control = {};
				scope.control.submit = submit;
				scope.control.reset = reset;

				scope.$on((attr.emitFrom ? attr.emitFrom + '.' : '') + 'customForm.data', init);
			}
		];

	function directive () {
		return {
			restrict: 'E',
			replace: true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'app/component/customForm/customForm.html',
			controller : controller
		};
	}
	
	angular.module('component.customForm', [])
		.directive('customForm', [
			directive
		]);
}());
