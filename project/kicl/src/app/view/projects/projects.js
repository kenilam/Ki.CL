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

					globalFooter = angular.element('.globalFooter'),

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

						return;
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
					
					timeout.cancel(scope.timer.broadcastCurrent);
					scope.timer.broadcastCurrent = timeout(broadcastCurrent, 500);
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

				function troggleGlobalFooter (show) {
					root.$broadcast('globalFooter.' + (show ? 'show' : 'hide') );
				}

				function setupControl () {
					if (!projects) {
						projects = element.find('[data-api="behance.projects"] li');
					}

					projects.each(assignProjectEvent);
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
						scope.$broadcast('view.projects.behance.' + type + '.throbber.show');
					};
					Control.prototype.throbber.hide = function (callback) {
						scope.$broadcast('view.projects.behance.' + type + '.throbber.hide');
					};

					Control.prototype.checkPromise = function () {
						var promise = ctl.promise();

						if (promise.$$state.status > 0) {
							promise.then(ctl.loaded);
							ctl.throbber.show();
						}
					};
					Control.prototype.loaded = function (data) {
						ctl.data = data;

						if (ctl.onLoaded) {
							ctl.onLoaded(data);
						}

						ctl.throbber.hide();
					};

					ctl = new Control();
					ctl.prototype = Control.prototype;

					return ctl;
				}

				function CursorControl () {
					var ctl;

					function Control () {}

					Control.prototype.tween = function () {
						var defaultProp = {};

						defaultProp.cursor = {};
						defaultProp.cursor.duration = 0;
						defaultProp.cursor.ease = Back.easeIn;

						defaultProp.svg = {};
						defaultProp.svg.duration = 0.5;
						defaultProp.svg.ease = Bounce.easeOut;

						function mapProp (property, name) {
							_.extend(property, { ease : defaultProp[name].ease });
						}

						function tweenTarget (elm, name) {
							if (_.has(ctl.prop, name)) {
								tween.to(elm, ctl.prop.duration, ctl.prop[name]);
							}
						}

						_.mapObject(ctl.prop, mapProp);

						_.each(ctl.target, tweenTarget);
					};

					Control.prototype.validateSelector = function (currentTaregt) {
						var target = angular.element(currentTaregt);

						function validate (selector) {
							return	target.closest(selector).length ||
									target.find('li'+ selector).length;
						}

						return validate;
					};

					Control.prototype.mouseMove = function (target, event) {
						var validateSelector = ctl.validateSelector(event.target),
							isProjects = validateSelector('.projectsWrapper'),
							isPrev = validateSelector('.isPrev'),
							isNext = validateSelector('.isNext'),
							isCurrent = validateSelector('.isCurrent');

						ctl.target = target;

						ctl.prop = {};

						ctl.prop.cursor = {};
						ctl.prop.cursor.opacity = 0;

						ctl.prop.svg = {};
						ctl.prop.svg.rotation = 90;

						scope.$broadcast('viewProjects.cursor.' + ( isProjects ? 'unpause' : 'pause' ));
						
						if (isProjects) {
							ctl.prop.cursor.opacity = 1;
						}

						if (isProjects && isPrev) {
							ctl.prop.svg.rotation = 180;
						}

						if (isProjects && isNext) {
							ctl.prop.svg.rotation = 0;
						}

						ctl.tween();
					};

					ctl = new Control();
					ctl.prototype = Control.prototype;

					return ctl;
				}

				function assignCursorEvents () {
					scope.$broadcast('viewProjects.cursor.mouseMove.assign', new CursorControl().mouseMove);
				}

				function assignProjectEvent (index, project) {
					angular.element(project).bind('click', onClick(index));
				}

				function onEnterTrigger (toState, fromState) {
					var prop = {
							opacity : 1,
							scale : 1,
							delay : fromState && fromState.name ? 0.2 : 1,
							ease : Back.easeInOut
						};

					function trigger () {
						if (toState.name === fromState.name && toState.name === 'projects.project') {
							return;
						}

						tween.killTweensOf(element);
						tween.to(element, 1, prop);
					}

					if (mediaquery().largemobile) {
						delete prop.scale;
					}

					return trigger;
				}

				function onEnter (toState, fromState) {
					var prop = {
							opacity : 1,
							scale : 1
						};

					if (toState.name === fromState.name && toState.name === 'projects.project') {
						timeout.cancel(scope.timer.onEnterTrigger);
						scope.timer.onEnterTrigger = timeout(onEnterTrigger(toState, fromState), 0);

						return;
					}

					if (mediaquery().largemobile) {
						delete prop.scale;
					}

					tween.killTweensOf(element);
					tween.set(element, prop);

					timeout.cancel(scope.timer.onEnterTrigger);
					scope.timer.onEnterTrigger = timeout(onEnterTrigger(toState, fromState), 0);
				}

				function onClick (index) {
					function whenClick () {
						navigateToProjectView(scope.projects[index].id);
					}

					return whenClick;
				}

				function onScroll () {
					troggleGlobalFooter(
						element.scrollTop() <= 0
					);
				}

				function init () {
					timeout.cancel(scope.timer.behanceProjects_check_promise);
					scope.timer.behanceProjects_checkPromise = timeout(behanceProjects.checkPromise, 0);

					if (state.params.project) {
						timeout.cancel(scope.timer.behanceProject_checkPromise);
						scope.timer.behanceProject_checkPromise = timeout(behanceProject.checkPromise, 0);
					}
					
					root.$broadcast('globalHeader.show');
				}

				function destroy () {
					var prop = {
						opacity : 0
					};

					if (!projectsWrapper) {
						projectsWrapper = element.children('.projectsWrapper');
					}
					
					tween.set(projectsWrapper, { css : { backgroundColor : projectsWrapper.css('background-color') } });

					_.forEach(scope.timer, function (timer, name) {
						timeout.cancel(scope.timer[name]);
					});

					root.$broadcast('view.projects.unset.current');

					_window.unbind('scroll');

					tween.killTweensOf(element);
					tween.to(element, 1, prop);
				}

				behanceProjects = new BehanceControl('projects');
				behanceProjects.prototype.promise = function () {
					scope.ref.behanceProjects_promise = behanceReference.component.projects.promise;
					return scope.ref.behanceProjects_promise;
				};
				behanceProjects.prototype.onLoaded = function (data) {
					scope.projects = data.projects;

					defaultAction();

					_.each(scope.projects, setSitemap);
					
					if (state.current.name.substr(0, 8) === 'projects' && !state.params.project) {
						navigateToProjectView(scope.projects[0].id);

						return;
					}
				};

				behanceProject = new BehanceControl('project');
				behanceProject.prototype.promise = function () {
					if (!scope.ref.behanceProject) {
						scope.ref.behanceProject = {};
					}

					if (!scope.ref.behanceProject[state.params.project]) {
						scope.ref.behanceProject[state.params.project] = behanceReference.component.project[state.params.project].promise;
					}

					return scope.ref.behanceProject[state.params.project];
				};

				scope.status = {};
				scope.ref = {};
				scope.timer = {};
				scope.watcher = {};
				scope.name = resource.name;
				scope.content = resource.content;

				timeout.cancel(scope.timer.init);
				scope.timer.init = timeout(init, 0);

				timeout.cancel(scope.timer.cursor);
				scope.timer.cursor = timeout(assignCursorEvents, 0);

				_window.bind('scroll', onScroll);

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
