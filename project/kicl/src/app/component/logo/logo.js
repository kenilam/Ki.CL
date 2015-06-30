(function () {
	'use strict';

	var controller = [
		'$rootScope', '$scope', '$element', '$timeout', 'sitemap',
		function (root, scope, elm, timeout, sitemap) {
			scope.logo = sitemap.get('root').home;
		}
	];

	function directive () {
		return {
			restrict : 'E',
			replace : true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'app/component/logo/logo.html',
			controller : controller
		};
	}

	angular.module('component.logo', [])
		.directive('logo', [
			directive
		]);
}());
