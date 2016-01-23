(function globalHeader () {
	'use strict';

	var controller = [
		'$rootScope',
		'$scope',
		'$element',
		'$window',
		'$timeout',
		'mediaquery',
		function (root, scope, element, win, timeout, mediaquery) {
			var doc = angular.element(document);

			function hide () {
				delete scope.globalHeader.show;
			}

			function show () {
				scope.globalHeader.show = true;
			}

			scope.globalHeader = {};
			scope.globalHeader.show = false;

			scope.$on('globalHeader.hide', hide);
			scope.$on('globalHeader.show', show);
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