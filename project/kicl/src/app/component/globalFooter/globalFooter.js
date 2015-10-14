(function globalFooter () {
	'use strict';

	var controller = [
		'$rootScope',
		'$scope',
		'$element',
		function controller (root, scope, element) {
			var control = {
					get : {
						height : function () {
							return element.outerHeight();
						}
					}
				},
				broadcast = {
					height : function (height) {
						root.$broadcast('globalFooter.height', height);
					}
				};

			scope.$watch(control.get.height, broadcast.height);
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
