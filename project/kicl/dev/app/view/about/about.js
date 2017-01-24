(function about () {
	'use strict';

	var dependencies = [],

		ref = {};

	angular
		.module('view.about', dependencies)
		.config(['$stateProvider',
			function config (stateProvider) {
				stateProvider.state({
					name : 'about',
					url : '/about',
					resolve : {
						resource: ['async', function resource (async) {
							if (!ref.resource) {
								ref.resource = async({ url : 'app/view/about/about.json' }).get().$promise;
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
							templateUrl : 'app/view/about/about.html',
							controller : 'view.about.controller'
						}
					}
				});
			}
		])
		.run([
			'sitemap',
			function run (sitemap) {
				sitemap.add('about', { name : 'about', route : 'about' });
			}
		])
		.controller('view.about.controller', [
			'$rootScope',
			'$scope',
			'$anchorScroll',
			'resource',
			function controller (root, scope, anchorScroll, resource) {
				scope.content = resource.content;
				scope.name = resource.name;
				scope.route = resource.route;
				
				scope.$emit('update.view.data', { name : resource.name, route : resource.route });

				root.$broadcast('globalHeader.show');

				anchorScroll();
			}
		]);
}());