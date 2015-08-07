(function home () {
	'use strict';
	
	var ref = {},
		state = {
			name: 'home',
			url: '/home',
			resolve : {
				resource: ['async', 'viewHomeResource', function resource (async, viewHomeResource) {
					if (!ref.resource) {
						ref.resource = async({ url : viewHomeResource }).get().$promise;
					}

					return ref.resource;
				}]
			},
			views: {
				'section' : {
					templateUrl: 'app/view/home/home.html',
					controller: 'view.home.controller'
				}
			}
		},
		constant = {
			resource : 'app/view/home/home.json'
		},
		controller = [
			'$scope',
			'resource',
			'sitemap',
			function controller (scope, resource, sitemap) {
				var callback = {
						data : function () {
							scope.$broadcast('behance.user.about.throbber.hide');
						}
					};

				scope.name = resource.name;
				scope.content = resource.content;

				scope.state = {};
				scope.state.loading = true;

				scope.$on('behance.user.about.data', callback.data);
				
				sitemap.current('home', 'root');
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
				sitemap.add('home', {name: 'home', route: 'home()'});
			}
		];

	angular
		.module('view.home', [])
		.constant('viewHomeResource', constant.resource)
		.config(config)
		.run(run)
		.controller('view.home.controller', controller);
}());
