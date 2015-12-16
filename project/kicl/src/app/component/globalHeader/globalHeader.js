(function globalHeader () {
	'use strict';

	var controller = [
		'$rootScope',
		'$scope',
		'$window',
		'$element',
		'$timeout',
		'mediaquery',
		function (root, scope, win, element, timeout, mediaquery) {
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

			function logoHeight () {
				scope.globalHeader.ref.logo.height = element.children('.logo').outerHeight();
				
				return scope.globalHeader.ref.logo.height;
			}

			function udpateHeight () {
				timeout.cancel(scope.globalHeader.timer.broadcastHeight);
				scope.globalHeader.timer.broadcastHeight = timeout(broadcastHeight, 0);
			}
			
			function broadcastHeight () {
				root.$broadcast('globalHeader.height', height());
			}

			function toggleLogo () {
				scope.globalHeader.ref.showLogo = !Boolean(doc.scrollTop() > logoHeight() && !mediaquery().mobile);
				
				if (!scope.$$phase) {
					scope.$apply();
				}

				scope.globalHeader.ref.scrollPos = doc.scrollTop();
			}

			function scroll (event) {
				udpateHeight();
				toggleLogo();
			}

			function resize (event) {
				udpateHeight();
				toggleLogo();
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

			doc.bind('scroll', scroll);
			angular.element(win).resize(resize);
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
