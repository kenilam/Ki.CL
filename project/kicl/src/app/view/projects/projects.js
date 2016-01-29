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
			'$anchorScroll',
			'mediaquery',
			'resource',
			'behanceReference',
			'sitemap',
			'statechange',
			'tween',
			function controller (root, scope, state, win, element, timeout, anchorScroll, mediaquery, resource, behanceReference, sitemap, stateChange, tween) {
				var gutter = 20,

					_window = angular.element(win),
					projectsWrapper,
					projectsHolder,
					projects,
					projectUiView,

					behanceProjects,
					behanceProject;

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

					if (index < scope.status.currentIndex) {
						list.addClass('isPrev');
					}

					if (index > scope.status.currentIndex) {
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
					scope.status.currentIndex = id;
					broadcastCurrent();
				}

				function broadcastCurrent (id) {
					root.$broadcast('view.projects.set.current', scope.projects[scope.status.currentIndex]);
				}

				function navigateToProjectView (id) {
					state.go('projects.project', { project : id });
				}

				function transitionProjectsHolder () {
					var prop = {
						x : (-1 * 100 * scope.status.currentIndex) + '%',
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

				function BehanceControl (type, actions) {
					var ctl;

					function Control () {}

					Control.prototype.throbber = {};
					Control.prototype.throbber.show = function (callback) {
						scope.$broadcast('behance.' + type + '.throbber.show');
					};
					Control.prototype.throbber.hide = function (callback) {
						scope.$broadcast('behance.' + type + '.throbber.hide');
					};

					Control.prototype.checkPromise = function () {
						ctl.promise().then(ctl.loaded);
						ctl.throbber.show();
					};
					Control.prototype.loaded = function (data) {
						ctl.onLoaded(data);
						ctl.throbber.hide();
					};

					ctl = new Control();
					ctl.prototype = Control.prototype;

					return ctl;
				}

				function onEnter (toState, fromState) {
					var delay = fromState.name ? 0.2 : 1;

					if (
						(toState.name === 'projects' || fromState.name === 'projects.project') &&
						!state.params.project &&
						scope.projects
					) {
						navigateToProjectView(scope.projects[0].id);

						return;
					}

					if (state.params.project) {
						timeout.cancel(scope.timer.behanceProject_checkPromise);
						scope.timer.behanceProject_checkPromise = timeout(behanceProject.checkPromise, 0);
					}

					if (scope.projects) {
						defaultAction();
					}

					if (toState.name === fromState.name && toState.name === 'projects.project') {
						return;
					}

					tween.killTweensOf(element);

					if (mediaquery().largemobile) {
						tween.set(element, { opacity : 0 });
						tween.to(element, 1, { opacity : 1, delay : delay });

						return;
					}

					tween.set(element, { opacity : 0, scale : 0.6 });
					tween.to(element, 1, { opacity : 1, scale : 1, delay : delay, ease : Back.easeInOut });
				}

				function init () {
					timeout.cancel(scope.timer.behanceProjects_check_promise);
					scope.timer.behanceProjects_checkPromise = timeout(behanceProjects.checkPromise, 0);

					if (state.params.project) {
						timeout.cancel(scope.timer.behanceProject_checkPromise);
						scope.timer.behanceProject_checkPromise = timeout(behanceProject.checkPromise, 0);
					}
				}

				function destroy () {
					_.forEach(scope.timer, function (timer, name) {
						timeout.cancel(scope.timer[name]);
					});

					root.$broadcast('view.projects.unset.current');

					tween.killTweensOf(element);
					tween.to(element, 1, { opacity : 0, scale : 1.2, ease : Back.easeOut });
				}

				behanceProjects = new BehanceControl('projects');
				behanceProjects.prototype.promise = function () {
					scope.ref.behanceProjects_promise = behanceReference.component.projects.promise;
					return scope.ref.behanceProjects_promise;
				}
				behanceProjects.prototype.onLoaded = function (data) {
					scope.projects = data.projects;

					root.$broadcast('globalHeader.show');

					if (!state.params.project) {
						navigateToProjectView(scope.projects[0].id);

						return;
					}

					_.each(scope.projects, setSitemap);

					defaultAction();
				}

				behanceProject = new BehanceControl('project');
				behanceProject.prototype.promise = function () {
					if (!scope.ref.behanceProject_promise) {
						scope.ref.behanceProject_promise = {};
					}

					if (!scope.ref.behanceProject_promise[state.params.project]) {
						scope.ref.behanceProject_promise[state.params.project] = behanceReference.component.project[state.params.project].promise;
					}

					scope.status.behanceProject_loading = true;

					return scope.ref.behanceProject_promise[state.params.project];
				}
				behanceProject.prototype.onLoaded = function (data) {
					delete scope.status.behanceProject_loading;
				}

				scope.status = {};
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
