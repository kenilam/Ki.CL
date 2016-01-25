(function globalHeader () {
	'use strict';

	var controller = [
		'$rootScope',
		'$scope',
		'$element',
		function (root, scope, element) {
			function hide () {
				delete scope.globalHeader.show;
			}

			function show () {
				scope.globalHeader.show = true;
			}

			function getHeight () {
				return element.outerHeight();
			}

			function broadcastHeight (height) {
				root.$broadcast('globalHeader.height', height);
			}

			scope.globalHeader = {};
			scope.globalHeader.show = false;

			scope.$on('globalHeader.hide', hide);
			scope.$on('globalHeader.show', show);
			scope.$watch(getHeight, broadcastHeight);
		}
	];

	function directive () {
		return {
			restrict: 'E',
			replace: true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'app/component/globalHeader/globalHeader.html',
			controller : controller
		};
	}

	angular.module('component.globalHeader', [])
		.directive('globalHeader', [
			directive
		]);
}());