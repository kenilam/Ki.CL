
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
				var callback = {
						data : function (event, project) {
							scope.$broadcast('behance.project.throbber.hide');

							scope.$emit('backdrop.add', { image : project.covers });

							if (sitemap.get().projects.children) {
								sitemap.current(project.id, 'projects');
							}
						},
						setSitemap : function (event, projects) {
							function whenSetSitemap () {
								sitemap.current(stateParams.project, 'projects');
							}

							if (!sitemap.get().projects.children) {
								_.each(projects, eachProject);

								timeout.cancel(scope.timer.setSitemap);
								scope.timer.setSitemap = timeout(whenSetSitemap, 0);
							}
						},
						stateChangeStart : function (event, toState) {
							var map = toState.name.split('.'),
								name = _.last(map);

							if (map.length > 1) {
								map.length = map.length - 2;
							} else {
								map = 'root';
							}

							if (typeof map !== 'string') {
								map = map.join('.');
							}

							if (toState.name !== 'projects.project') {
								sitemap.current(name, map);
							}

							scope.$emit('backdrop.remove');
						},
						stateChangeSuccess : function (event, toState, toParams, fromState, fromParams) {
							scope.$emit('backdrop.remove');
						},
						destroy : function () {
							scope.$emit('backdrop.remove');

							delete root.ref.project.id;
						}
					};

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

				scope.name = resource.name;
				scope.content = resource.content;
				scope.id = stateParams.project;

				root.ref.project = {};
				root.ref.project.id = scope.id;

				scope.$on('$stateChangeStart', callback.stateChangeStart);
				scope.$on('$stateChangeSuccess', callback.stateChangeSuccess);
				scope.$on('behance.projects.data', callback.setSitemap);
				scope.$on('behance.project.data', callback.data);

				scope.$on('$destroy', callback.destroy);

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
