(function globalFooter () {
	'use strict';

	var controller = [
		'$rootScope',
		'$scope',
		'$element',
		'$timeout',
		'mediaquery',
		function (root, scope, element, timeout, mediaquery) {
			function height () {
				return element.outerHeight();
			}
			
			function broadcastHeight (newHeight, oldHeight) {
				if (newHeight !== oldHeight) {
					root.$broadcast('globalFooter.height', height());
				}
			}

			scope.globalFooter = {};
			scope.globalFooter.timer = {};

			scope.$watch(height, broadcastHeight);
		}
	];

	function directive () {
		return {
			restrict: 'E',
			replace: true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'app/component/globalFooter/globalFooter.html',
			controller : controller
		};
	}

	angular.module('component.globalFooter', [])
		.directive('globalFooter', [
			directive
		]);
}());
