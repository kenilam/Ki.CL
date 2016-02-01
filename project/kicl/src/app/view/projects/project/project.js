
(function project() {
	'use strict';

	var ref = {},
		state = {
			name: 'projects.project',
			url: '/:project',
			resolve : {
				resource: ['async', 'viewProjectsProjectResource', function resource (async, viewProjectsProjectResource) {
					if (!ref.resource) {
						ref.resource = async({ url : viewProjectsProjectResource }).get().$promise;
					}

					return ref.resource;
				}]
			},
			views: {
				'project' : {
					templateUrl : 'app/view/projects/project/project.html',
					controller : 'view.projects.project.controller'
				}
			}
		},
		constant = {
			resource : 'app/view/projects/project/project.json'
		},
		controller = [
			'$rootScope',
			'$scope',
			'$element',
			'$timeout',
			'$state',
			'$stateParams',
			'behanceReference',
			'resource',
			'sitemap',
			function controller (root, scope, element, timeout, state, stateParams, reference, resource, sitemap) {
				function eachProject (project, index) {
					sitemap.add(
						project.id,
						{
							name: project.name,
							route: 'projects.project({project:"' + project.id + '"})'
						},
						'projects'
					);
				}

				function filterState (state) {
					var map = state.name.split('.');

					if (map.length > 1) {
						map.length = map.length - 2;

						return map.join('.');
					}

					return 'root';
				}

				function stateChangeStart (event, toState) {
					if (toState.name !== 'projects.project') {
						sitemap.current(name, filterState(toState));
					}

					scope.$emit('backdrop.remove');
				}

				function setSitemap (event, projects) {
					function whenSetSitemap () {
						sitemap.current(stateParams.project, 'projects');
					}

					if (!sitemap.get().projects.children) {
						_.each(projects, eachProject);

						timeout.cancel(scope.timer.setSitemap);
						scope.timer.setSitemap = timeout(whenSetSitemap, 0);
					}
				}

				function init (event, data) {
					scope.$broadcast('view.projects.project.behance.project.throbber.hide');

					if (sitemap.get().projects.children) {
						sitemap.current(data.id, 'projects');
					}
				}

				scope.name = resource.name;
				scope.content = resource.content;
				scope.id = stateParams.project;

				root.ref.project = {};
				root.ref.project.id = scope.id;

				scope.$on('$stateChangeStart', stateChangeStart);
				scope.$on('behance.projects.data', setSitemap);
				scope.$on('behance.project.data', init);

				root.$broadcast('globalHeader.show');
			}
		],
		config = [
			'$stateProvider',
			function config (stateProvider) {
				stateProvider.state(state);
			}
		],
		run = [
			'$timeout',
			'$stateParams',
			'sitemap',
			function run (timeout, stateParams, sitemap) {
				sitemap.add('projects', {name: 'projects', route: 'projects'});
			}
		];
		
	angular
		.module('view.projects.project', [])
		.constant('viewProjectsProjectResource', constant.resource)
		.config(config)
		.run(run)
		.controller('view.projects.project.controller', controller);
}());
