(function projects () {
	'use strict';

	var ref = {},
		state = {
			name: 'projects',
			url: '/projects',
			resolve : {
				resource: ['async', 'viewProjectsResource', function resource (async, viewProjectsResource) {
					if (!ref.resource) {
						ref.resource = async({ url : viewProjectsResource }).get().$promise;
					}

					return ref.resource;
				}]
			},
			views: {
				'section' : {
					templateUrl: 'app/view/projects/projects.html',
					controller: 'view.projects.controller'
				}
			}
		},
		constant = {
			resource : 'app/view/projects/projects.json'
		},
		controller = [
			'$rootScope',
			'$scope',
			'$element',
			'$timeout',
			'resource',
			'sitemap',
			'mediaquery',
			'behanceReference',
			function controller (root, scope, element, timeout, resource, sitemap, mediaquery, behanceReference) {
				var get = {
						list : function () {
							return element.find('[data-api="behance.projects"] li');
						}
					},
					emit = {
						backdrop : function (image) {
							if (!mediaquery().mobile) {
								scope.$emit('backdrop.add', {
									image : image
								});
							}
						}
					},
					control = {
						mouseover : function (project) {
							emit.backdrop(project.covers);
						},
						mouseleave : function (project) {
							if (scope.current) {
								emit.backdrop(scope.current.covers);
								return;
							}
						}
					},
					callback = {
						data : function (event, projects) {
							function hasData () {
								_.each(projects, eachProject());

								emit.backdrop(projects[0].covers);
								
								scope.$broadcast('behance.projects.throbber.hide');
								scope.$broadcast('behance.projects.control', {
									mouseover : control.mouseover,
									mouseleave : control.mouseleave
								});
							}

							timeout.cancel(scope.timer.data);
							scope.timer.data = timeout(hasData, 0);
						},
						setCurrent : function (event, current) {
							scope.current = current;
						},
						unsetCurrent : function () {
							delete scope.current;
						},
						stateChangeSuccess : function (event, toState, toParams) {
							function whenPtojectsReady (data) {
								emit.backdrop(data.projects[0].covers);
							}

							if (toState.name === 'projects' && behanceReference.component.projects.promise) {
								behanceReference.component.projects.promise.then(whenPtojectsReady);
							}
						},
						destroy : function () {
							scope.$emit('backdrop.remove');
						}
					};

				function eachProject () {
					var projects = element.find('[data-api="behance.projects"] li'),
						isHidden = 'isHidden',
						pendding = 400,
						speed = 1600;

					function showProject (list) {
						function whenShow () {
							list.removeClass(isHidden);
						}

						return whenShow;
					}

					function setProject (project, index) {
						sitemap.add(
							project.id,
							{
								name: project.name,
								route: 'projects.project({project:"' + project.id + '"})'
							},
							'projects'
						);
					}

					return setProject;
				}

				scope.name = resource.name;
				scope.content = resource.content;
				scope.timer = {};
				scope.control = {};
				scope.control.mouseover = control.mouseover;
				scope.control.mouseleave = control.mouseleave;

				scope.$on('behance.projects.data', callback.data);
				scope.$on('behance.projects.set.current', callback.setCurrent);
				scope.$on('behance.projects.unset.current', callback.unsetCurrent);
				scope.$on('$stateChangeSuccess', callback.stateChangeSuccess);
				scope.$on('$destroy', callback.destroy);

				root.$broadcast('globalHeader.show');

				sitemap.current('projects', 'root');
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
				sitemap.add('projects', {name: 'projects', route: 'projects()'});
			}
		];

	angular
		.module('view.projects', [
			'view.projects.project'
		])
		.constant('viewProjectsResource', constant.resource)
		.config(config)
		.run(run)
		.controller('view.projects.controller', controller);
}());
