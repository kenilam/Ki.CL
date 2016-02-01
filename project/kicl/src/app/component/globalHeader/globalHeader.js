(function globalHeader () {
	'use strict';

	var controller = [
		'$rootScope',
		'$scope',
		'$window',
		'$element',
		function (root, scope, win, element) {
			var _window = angular.element(win);

			function hide () {
				delete scope.globalHeader.status.show;
			}

			function show () {
				scope.globalHeader.status.show = true;
			}

			function showNavigation () {
				scope.globalHeader.status.navigation.show = true;

				scope.$on('globalHeader.navigation.hamburgerButton.close');
			}

			function hideNavigation () {
				delete scope.globalHeader.status.navigation.show;

				scope.$on('globalHeader.navigation.hamburgerButton.open');
			}

			function troggleNavigation (event, status) {
				if (status === 'close') {
					hideNavigation();

					return;
				}

				showNavigation();
			}

			function getHeight () {
				return element.outerHeight();
			}

			function broadcastHeight (height) {
				root.$broadcast('globalHeader.height', height);
			}

			function stateChangeSuccess () {
				hideNavigation();
			}

			function onScroll (event) {
				if (angular.element(document).scrollTop() >= element.outerHeight()) {
					scope.globalHeader.status.scrolled = true;
					return;
				}

				delete scope.globalHeader.status.scrolled;
			}

			scope.globalHeader = {};

			scope.globalHeader.status = {};
			scope.globalHeader.status.show = false;
			scope.globalHeader.status.navigation = {};
			scope.globalHeader.status.navigation.show = true;

			scope.$on('globalHeader.hide', hide);
			scope.$on('globalHeader.show', show);
			scope.$on('globalHeader.navigation.show', showNavigation);
			scope.$on('globalHeader.navigation.hide', hideNavigation);
			scope.$on('globalHeader.navigation.hamburgerButton.troggle', troggleNavigation);

			scope.$on('$stateChangeSuccess', stateChangeSuccess);

			scope.$watch(getHeight, broadcastHeight);

			_window.bind('scroll', onScroll);
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