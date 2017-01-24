(function copyright () {
	'use strict';

	var dependencies = [
		
	];

	angular
		.module('component.copyright', dependencies)
		.service('component.copyright.resource', [
			'$interpolate',
			function (interpolate) {
				var scope;

				function hasResource (event, resource) {
					scope.resource = resource;
					
					scope.resource.message = interpolate(resource.message)({
						year : moment(new Date()).year()
					});
				}
				
				this.assign = function (scopeRef) {
					scope = scopeRef;

					scope.$on('kicl.component.copyright.resource', hasResource);
				};
			}
		])
		.directive('copyright', [
			function directive (root, sitemap, render) {
				return {
					restrict : 'E',
					replace : true,
					scope : {
						'isolate' : '&'
					},
					templateUrl : 'app/component/copyright/copyright.html',
					controller : 'component.copyright.controller'
				};
			}
		])
		.controller('component.copyright.controller', [
			'$scope',
			'$attrs',
			'component.copyright.resource',
			function controller (scope, attrs, resource) {
				resource.assign(scope);
			}
		]);
}());
