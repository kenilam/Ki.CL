(function globalFooter () {
	'use strict';

	var controller = [
		'$rootScope',
		'$scope',
		'$element',
		function (root, scope, element) {
			var callback = {
					height : function (height) {
						broadcast.height(height);
					}
				},

				broadcast = {
					height : function (height) {
						root.$broadcast('globalFooter.height', height);
					}
				};

			function height () {
				return element.outerHeight();
			}

			scope.$watch(height, callback.height);
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
