(function contact () {
	'use strict';

	var ref = {},
		state = {
			name: 'contact',
			url: '/contact',
			resolve : {
				resource: ['async', 'viewContactResource', function resource (async, viewContactResource) {
					if (ref.resource) {
						return ref.resource;
					}

					ref.resource = async({ url : viewContactResource }).get().$promise;

					return ref.resource;
				}]
			},
			views: {
				'section' : {
					templateUrl: 'app/view/contact/contact.html',
					controller: 'view.contact.controller'
				}
			}
		},
		constant = {
			resource : 'app/view/contact/contact.json'
		},
		controller = [
			'$scope',
			'$timeout',
			'resource',
			'sitemap',
			function controller (scope, timeout, resource, sitemap) {
				function broadcast () {
					resource.component.customForm.name = "contactFrom";
					
					scope.$broadcast('contact.customForm.data', resource.component.customForm);
				}

				scope.name = resource.name;
				
				sitemap.current('contact', 'root');

				timeout(broadcast, 0);
			}
		],
		config = [
			'$stateProvider',
			function config (stateProvider) {
				stateProvider.state(state);
			}
		],
		run = [
			'sitemap',
			function run (sitemap) {
				sitemap.add('contact', {name: 'contact', route: 'contact()'});
			}
		];

	angular
		.module('view.contact', [])
		.constant('viewContactResource', constant.resource)
		.config(config)
		.run(run)
		.controller('view.contact.controller', controller);
}());
