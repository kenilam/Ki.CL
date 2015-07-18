(function form () {
	'use strict';

	var customForm,
		elmRef,
		controller = [
			'$scope', '$timeout',
			function (scope, timeout) {
				scope.customForm = customForm = {};
			}
		],

		callback = {
			data : function (event, data) {
				customForm.data = data;
			}
		};

	function link (scope, elm, attr) {
		elmRef = elm;

		scope.$on((attr.emitFrom ? attr.emitFrom + '.' : '') + 'customForm.data', callback.data);
	}

	function directive () {
		return {
			restrict: 'E',
			replace: true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'app/component/customForm/customForm.html',
			controller : controller,
			link : link
		};
	}
	
	angular.module('component.customForm', [])
		.directive('customForm', [
			directive
		]);
}());
