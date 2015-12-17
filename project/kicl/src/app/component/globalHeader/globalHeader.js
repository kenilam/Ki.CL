(function globalHeader () {
	'use strict';

	var controller = [
		'$rootScope',
		'$scope',
		'$element',
		'$timeout',
		'mediaquery',
		function (root, scope, element, timeout, mediaquery) {
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
				scope.globalHeader.timer.broadcastHeight = timeout(broadcastHeight, 100);
			}
			
			function broadcastHeight () {
				root.$broadcast('globalHeader.height', height());
			}

			function toggleLogo () {
				if (doc.scrollTop() > scope.globalHeader.ref.logo.height && !mediaquery().mobile) {
					scope.globalHeader.ref.showLogo = false;
				} else {
					scope.globalHeader.ref.showLogo = true;
				}
				
				if (!scope.$$phase) {
					scope.$apply();
				}

				scope.globalHeader.ref.scrollPos = doc.scrollTop();

				root.$broadcast('globalHeader.logo.toggle', {
					show : scope.globalHeader.ref.showLogo,
					height : scope.globalHeader.ref.logo.height
				});
			}

			function windowScroll (event) {
				toggleLogo();
			}

			function init () {
				scope.globalHeader.ref.logo.height = element.children('.logo').outerHeight();
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

			doc.bind('scroll', windowScroll);

			timeout.cancel(scope.globalHeader.timer.init);
			scope.globalHeader.timer.init = timeout(init, 1000);
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