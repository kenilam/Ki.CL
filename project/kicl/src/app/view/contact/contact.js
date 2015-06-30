(function () {
	'use strict';

	var ref = {},
		state = {
			name: 'contact',
			url: '/contact',
			resolve : {
				resource: ['async', 'viewContactResource', function (async, viewContactResource) {
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
			'$rootScope',
			'$scope',
			'resource',
			'sitemap',
			function controller (root, scope, resource, sitemap) {
				scope.content = resource.content;
				sitemap.current('contact', 'root');
			}
		],
		config = [
			'$stateProvider',
			function config (stateProvider) {
				stateProvider.state(state);
			}
		],
		run = [
			'$rootScope', '$timeout', 'sitemap',
			function (root, timeout, sitemap) {
				sitemap.add('contact', {name: 'contact', route: 'contact'});
				sitemap.current('contact', 'root');
			}
		];

	angular
		.module('view.contact', ['ui.router'])
		.constant('viewContactResource', constant.resource)
		.config(config)
		.run(run)
		.controller('view.contact.controller', controller);
}());
