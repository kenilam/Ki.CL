(function () {
	'use strict';

	var controller = [
		'$rootScope', '$scope', '$element', '$timeout', 'sitemap',
		function (root, scope, elm, timeout, sitemap) {
			scope.navigation = {};

			scope.navigation.list = sitemap.get(elm.data('list'));
		}
	];

	function directive () {
		return {
			restrict : 'E',
			replace : true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'app/component/navigation/navigation.html',
			controller : controller
		};
	}

	angular.module('component.navigation', [])
		.directive('navigation', [
			directive
		]);
}());
