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

			function showLogo () {
				scope.globalFooter.status.logo.show = true;
			}
			function hideLogo () {
				scope.globalFooter.status.logo.show = false;
			}

			scope.globalFooter = {};
			scope.globalFooter.timer = {};
			scope.globalFooter.status = {};
			scope.globalFooter.status.logo = {};
			scope.globalFooter.status.logo.show = true;

			scope.$on('globalFooter.logo.show', showLogo);
			scope.$on('globalFooter.logo.hide', hideLogo);

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
