(function contact () {
	'use strict';

	var dependencies = [],

		ref = {};

	angular
		.module('view.contact', dependencies)
		.config(['$stateProvider',
			function config (stateProvider) {
				stateProvider.state({
					name : 'contact',
					url : '/contact',
					resolve : {
						resource: ['async', function resource (async) {
							if (!ref.resource) {
								ref.resource = async({ url : 'app/view/contact/contact.json' }).get().$promise;
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
							templateUrl : 'app/view/contact/contact.html',
							controller : 'view.contact.controller'
						}
					}
				});
			}
		])
		.run([
			'sitemap',
			function run (sitemap) {
				sitemap.add('contact', { name : 'contact', route : 'contact' });
			}
		])
		.controller('view.contact.controller', [
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

				root.$broadcast('globalHeader.show');

				timeout.cancel(scope.viewContactTimer);
				scope.viewContactTimer = timeout(function sendData () {
					scope.$broadcast('view.contact.customForm.data', resource.component.customForm);
				});

				anchorScroll();
			}
		]);
}());