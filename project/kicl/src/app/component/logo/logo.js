(function logo () {
	'use strict';

	var dependencies = [
		
	];

	angular
		.module('component.logo', dependencies)
		.directive('logo', [
			function directive () {
				return {
					restrict : 'E',
					replace : true,
					scope : {
						'isolate' : '&'
					},
					templateUrl : 'app/component/logo/logo.html',
					controller : 'component.logo.controller'
				};
			}
		])
		.controller('component.logo.controller', [
			'$scope',
			'sitemap',
			function controller (scope, sitemap) {
				scope.logo = sitemap.get('root').home;
			}
		]);
}());