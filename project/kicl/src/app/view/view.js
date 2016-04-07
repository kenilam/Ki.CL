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

		.service('view.project.current', [
			'$rootScope',
			function currentProject (root) {
				this.update = function (event, current) {
					root.currentProject = current;
				};

				this.delete = function () {
					delete root.currentProject;
				};

				this.init = function () {
					root.$on('view.project.set.current', this.update);
					root.$on('view.project.unset.current', this.delete);
				};
			}
		])

		.service('view.route', [
			'$rootScope',
			function route (root) {
				this.update = function (event, data) {
					root.name = data.name;
					root.route = data.route;
					root.breadcrumb = data.route.split('.').map(function (value) {
						return value.toUpperCase();
					});
				};

				this.init = function () {
					root.$on('update.view.data', this.update);
				};
			}
		])

		.service('view.google.analytics', [
			'$rootScope',
			'$window',
			'$location',
			function (root, win, loc) {
				function stateChangeSuccess () {
					if (!win.ga) {
						return;
					}

					win.ga('send', 'pageview', { page: loc.path() });
				}

				root.$on('$stateChangeSuccess', stateChangeSuccess);
			}
		])

		.run([
			'$rootScope',
			'$window',
			'view.google.analytics',
			'view.project.current',
			'view.route',
			function run (root, win, viewGoogleAnalytics, viewCurrentProject, viewRoute) {
				viewCurrentProject.init();
				viewRoute.init();
			}
		]);
}());