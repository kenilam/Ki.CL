(function view () {
	'use strict';

	var dependencies = [
		'view.home',
		'view.about',
		'view.projects',
		'view.contact'
	];

	angular
		.module('view', dependencies)
		
		.constant('resource', '/data/resource.json')
		.constant('index', 'home')

		.config([
			'$locationProvider',
			'$urlRouterProvider',
			'index',
			function config (locationProvider, urlRouterProvider, index) {
				locationProvider.hashPrefix('!');
				urlRouterProvider.otherwise(index);
			}
		])

		.service('view.backdrop', [
			'$rootScope',
			function backdrop (root) {
				function set (event, url) {
					root.backdrop = url;
				}

				function unset () {
					delete root.backdrop;
				}

				root.$on('view.backdrop.set', set);
				root.$on('view.backdrop.unset', unset);
			}
		])

		.service('view.project.current', [
			'$rootScope',
			function currentProject (root) {
				function update (event, current) {
					root.currentProject = current;
				}

				function remove () {
					delete root.currentProject;
				}

				root.$on('view.project.set.current', update);
				root.$on('view.project.unset.current', remove);
			}
		])

		.service('view.route', [
			'$rootScope',
			function route (root) {
				function update (event, data) {
					root.name = data.name;
					root.route = data.route.split('.').map(function (value) {
						return value.toUpperCase();
					});
				}

				root.$on('update.view.data', update);
			}
		])

		.run([
			'view.project.current',
			'view.route',
			'googleAnalytics',
			function run () {}
		]);
}());