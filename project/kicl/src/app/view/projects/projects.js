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
					templateUrl : 'app/view/projects/projects.html',
					controller : 'view.projects.controller'
				}
			}
		},
		constant = {
			resource : 'app/view/projects/projects.json'
		},
		service = [

		],
		controller = [
			'$rootScope',
			'$scope',
			'$state',
			'$window',
			'$element',
			'$timeout',
			'mediaquery',
			'resource',
			'behanceReference',
			'sitemap',
			'statechange',
			'tween',
			function controller (root, scope, state, win, element, timeout, mediaquery, resource, behanceReference, sitemap, stateChange, tween) {
				var gutter = 20,

					_window = angular.element(win),
					projectsWrapper,
					projectsHolder,
					projects,
					projectUiView;

				function setSitemap (project, index) {
					sitemap.add(
						project.id,
						{
							name: project.name,
							route: 'projects.project({project:"' + project.id + '"})'
						},
						'projects'
					);
				}

				function updateProjectOrder (index, project) {
					var list = angular.element(project);

					list.removeClass('isPrev isNext');

					if (index < scope.ref.currentIndex) {
						list.addClass('isPrev');
					}

					if (index > scope.ref.currentIndex) {
						list.addClass('isNext');
					}
				}

				function updateProjects () {
					function whenUpdate () {
						projects.each(updateProjectOrder);
					}

					if (!projects) {
						projects = element.find('[data-api="behance.projects"] li');
					}

					timeout.cancel(scope.timer.updateProjects);
					scope.timer.updateProjects = timeout(whenUpdate, mediaquery().mobile ? 0 : 500);
				}

				function updateCurrent (id) {
					scope.ref.currentIndex = id;
					broadcastCurrent();
				}

				function broadcastCurrent (id) {
					root.$broadcast('view.projects.set.current', scope.projects[scope.ref.currentIndex]);
				}

				function navigateToProjectView (id) {
					state.go('projects.project', { project : id });
				}

				function transitionProjectsHolder () {
					var prop = {
						x : (-1 * 100 * scope.ref.currentIndex) + '%',
						delay : mediaquery().mobile ? 0.2 : 0.4,
						ease : Back.easeInOut
					};

					if (!projectsHolder) {
						projectsHolder = element.find('[data-api="behance.projects"]');

						prop.opacity = 1;
						prop.delay = 1.1;
						
						tween.set(projectsHolder, { opacity : 0 });
					}

					if (mediaquery().mobile) {
						delete prop.ease;
					}

					tween.killTweensOf(projectsHolder);
					tween.to(projectsHolder, 1, prop);
				}

				function assignProjectEvent (index, project) {
					angular.element(project).bind('click', onClick(index));
				}

				function setupControl () {
					if (!projects) {
						projects = element.find('[data-api="behance.projects"] li');
					}

					projects.each(assignProjectEvent);
				}

				function hideBehanceProjectsThrobber () {
					scope.$broadcast('behance.projects.throbber.hide');
				}

				function onClick (index) {
					function whenClick () {
						navigateToProjectView(scope.projects[index].id);
					}

					return whenClick;
				}

				function defaultAction () {
					updateCurrent(_.findIndex(scope.projects, { id : state.params.project }));
					transitionProjectsHolder();

					timeout.cancel(scope.timer.updateProjects);
					scope.timer.updateProjects = timeout(updateProjects, 0);

					timeout.cancel(scope.timer.setupControl);
					scope.timer.setupControl = timeout(setupControl, 0);
				}

				function whenInit (data) {
					scope.projects = data.projects;
					
					root.$broadcast('globalHeader.show');

					if (!state.params.project) {
						navigateToProjectView(scope.projects[0].id);

						return;
					}

					_.each(scope.projects, setSitemap);

					defaultAction();
				}

				function init () {
					behanceReference.component.projects.promise.then(whenInit);
				}

				function onEnter (toState, fromState) {
					var delay = fromState.name ? 0.2 : 1;

					window.scrollTo(0, -1 * gutter);

					if (
						(toState.name === 'projects' || fromState.name === 'projects.project') &&
						!state.params.project &&
						scope.projects
					) {
						navigateToProjectView(scope.projects[0].id);

						return;
					}

					if (scope.projects) {
						defaultAction();
					}

					if (toState.name === fromState.name && toState.name === 'projects.project') {
						return;
					}

					timeout.cancel(scope.timer.hideBehanceProjectsThrobber);
					scope.timer.hideBehanceProjectsThrobber = timeout(hideBehanceProjectsThrobber, 0);

					tween.killTweensOf(element);

					if (mediaquery().largemobile) {
						tween.set(element, { opacity : 0 });
						tween.to(element, 1, { opacity : 1, delay : delay });

						return;
					}

					tween.set(element, { opacity : 0, scale : 1.2 });
					tween.to(element, 1, { opacity : 1, scale : 1, delay : delay, ease : Bounce.easeOut });
				}

				function destroy () {
					_.forEach(scope.timer, function (timer, name) {
						timeout.cancel(scope.timer[name]);
					});

					root.$broadcast('view.projects.unset.current');
				}

				scope.ref = {};
				scope.timer = {};
				scope.name = resource.name;
				scope.content = resource.content;

				timeout.cancel(scope.timer.init);
				scope.timer.init = timeout(init, 0);

				sitemap.current('projects', 'root');
				
				stateChange(scope, { name : 'projects' }).when({ onEnter : onEnter, onExit : destroy });
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
