(function home () {
	'use strict';

	var dependencies = [],

		ref = {};

	angular
		.module('view.home', dependencies)
		.config(['$stateProvider',
			function config (stateProvider) {
				stateProvider.state({
					name : 'home',
					url : '/home',
					resolve : {
						resource : ['async', function resource (async) {
							if (!ref.resource) {
								ref.resource = async({ url : 'app/view/home/home.json' }).get().$promise;
							}

							return ref.resource;
						}],
						'backdrop' : ['resource', 'loadimage', function backdrop (resource, loadimage) {
							if (!ref.backdrop) {
								ref.backdrop = loadimage(resource.content.backdrop.image);
							}

							return ref.backdrop;
						}]
					},
					views : {
						'section' : {
							templateUrl : 'app/view/home/home.html',
							controller : 'view.home.controller'
						}
					}
				});
			}
		])
		.run([
			'sitemap',
			function run (sitemap) {
				sitemap.add('home', { name : 'home', route : 'home' });
			}
		])
		.controller('view.home.controller', [
			'$rootScope',
			'$scope',
			'$timeout',
			'$anchorScroll',
			'resource',
			function controller (root, scope, timeout, anchorScroll, resource) {
				scope.content = resource.content;
				scope.name = resource.name;
				scope.route = resource.route;

				scope.$emit('update.view.data', { name : resource.name, route : resource.route });

				root.$broadcast('globalHeader.hide');

				anchorScroll();
			}
		]);
}());

