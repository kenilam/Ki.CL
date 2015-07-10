(function logo () {
	'use strict';

	var controller = [
		'$scope', 'sitemap',
			function (scope, sitemap) {
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
