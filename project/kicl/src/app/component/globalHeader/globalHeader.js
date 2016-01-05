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

				udpateHeight();
			}

			function show () {
				scope.globalHeader.show = true;

				udpateHeight();
			}

			function height () {
				return scope.globalHeader.show ? element.outerHeight() : 0;
			}

			function udpateHeight () {
				timeout.cancel(scope.globalHeader.timer.broadcastHeight);
				scope.globalHeader.timer.broadcastHeight = timeout(broadcastHeight, 0);
			}

			function updateLogoHeight () {
				scope.globalHeader.ref.logo.height = element.children('.logo').outerHeight();
				
				if (!scope.$$phase) {
					scope.$apply();
				}
			}
			
			function broadcastHeight () {
				root.$broadcast('globalHeader.height', height());
			}

			function toggleLogo () {
				updateLogoHeight();
				
				scope.globalHeader.ref.showLogo = true;
				
				scope.globalHeader.ref.scrollPos = doc.scrollTop();
				
				if (scope.globalHeader.ref.scrollPos > scope.globalHeader.ref.logo.height && !mediaquery().largemobile) {
					scope.globalHeader.ref.showLogo = false;
				}
				
				if (!scope.$$phase) {
					scope.$apply();
				}

				root.$broadcast('globalHeader.logo.toggle', {
					show : scope.globalHeader.ref.showLogo,
					height : scope.globalHeader.ref.logo.height
				});
			}

			function scroll (event) {
				toggleLogo();
			}

			function resize (event) {
				updateLogoHeight();
			}

			function init () {
				updateLogoHeight();
			}

			function destroy () {
				timeout.cancel(scope.globalHeader.timer.broadcast);
			}

			scope.globalHeader = {};
			scope.globalHeader.ref = {};
			scope.globalHeader.ref.showLogo = true;
			scope.globalHeader.ref.logo = {};
			scope.globalHeader.ref.scrollPos = 0;

			scope.globalHeader.timer = {};

			scope.$watch(height, broadcastHeight, true);

			scope.$on('globalHeader.hide', hide);
			scope.$on('globalHeader.show', show);

			doc.bind('scroll scrollend', scroll);
			angular.element(win).bind('resize', resize);

			timeout.cancel(scope.globalHeader.timer.init);
			scope.globalHeader.timer.init = timeout(init, 0);
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