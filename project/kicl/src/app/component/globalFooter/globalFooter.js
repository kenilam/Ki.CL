(function globalFooter () {
	'use strict';

	var controller = [
		'$rootScope',
		'$scope',
		'$element',
		function (root, scope, element) {
			function hide () {
				delete scope.globalFooter.show;
			}

			function show () {
				scope.globalFooter.show = true;
			}

			function getHeight () {
				return element.outerHeight();
			}

			function broadcastHeight (height) {
				root.$broadcast('globalFooter.height', height);
			}

			scope.globalFooter = {};
			scope.globalFooter.show = false;

			scope.$on('globalFooter.hide', hide);
			scope.$on('globalFooter.show', show);
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
			templateUrl : 'app/component/globalFooter/globalFooter.html',
			controller : controller
		};
	}

	angular.module('component.globalFooter', [])
		.directive('globalFooter', [
			directive
		]);
}());
