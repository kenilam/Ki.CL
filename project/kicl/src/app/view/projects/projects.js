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
			'sitemap',
			'statechange',
			'tween',
			function controller (root, scope, state, win, element, timeout, anchorScroll, mediaquery, resource, sitemap, stateChange, tween) {
				var _window = angular.element(win),
					projectsWrapper,
					projects,
					projectUiView,
					cursor,
					firstRun = true,
					gutter = 40;

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

				function behanceProjectsRenderEachProject (index, list) {
					function whenRender (idx) {
						function whileRender () {
							project.removeClass('isNext isPrev');

							if (idx < scope.ref.currentIndex) {
								project.addClass('isPrev');
							}

							if (idx > scope.ref.currentIndex) {
								project.addClass('isNext');
							}

							if (idx === scope.ref.currentIndex) {
								prop.scale = mediaquery().mobile ? 1 : 1.3;
							}

							tween.to(project, 0.5, prop);
						}

						timeout.cancel(scope.timer.behanceProjectsRenderEachProject[idx]);
						scope.timer.behanceProjectsRenderEachProject[idx] = timeout(whileRender, window.scrollY > 0 ? 1000 : 0);
					}

					var project = angular.element(list),
						prop = {
							scale : mediaquery().mobile ? 0.3 : 1,
							ease : Expo.easeOut
						};

					if (!scope.timer.behanceProjectsRenderEachProject) {
						scope.timer.behanceProjectsRenderEachProject = {};
					}

					whenRender(index);
				}

				function behanceProjectsRender () {
					if (!projects) {
						projects = element.find('[data-api="behance.projects"]');
					}

					projects.children().each(behanceProjectsRenderEachProject);
				}

				function behanceProjectsWhenTransition (callback) {
					projectUiView = element.find('section[ui-view=project]');

					tween.set(projectUiView, { opacity : 0 });

					function onceTransition () {
						tween.set(projectUiView, { opacity : 1 });
					}

					function onceTransitionCallback () {
						callback(onceTransition);
					}

					function whenTransition () {
						projectUiView = element.find('section[ui-view=project]');

						tween.killTweensOf(projectUiView);
						tween.set(projectUiView, {
							opacity : 0,
							y : projectsWrapper.outerHeight() + gutter,
							onComplete : callback ? onceTransitionCallback : onceTransition
						});
					}

					return whenTransition;
				}

				function behanceProjectsTransition (callback) {
					var whenTransition = behanceProjectsWhenTransition(callback),

						prop = {
							x : (-100 * scope.ref.currentIndex) + '%',
							ease : Back.easeOut,
							onComplete : onceScrolledComplete
						};

					function onceScrolledComplete () {
						projects.removeClass('isTransitioning');

						timeout.cancel(scope.timer.onceScrolledComplete);
						scope.timer.onceScrolledComplete = timeout(whenTransition, 1000);
					}

					function onceScrolledCompleteWithCallback (callback) {
						function whenComplete () {
							onceScrolledComplete();

							timeout.cancel(scope.timer.onceScrolledCompleteWithCallback);
							scope.timer.onceScrolledCompleteWithCallback = timeout(callback, 1000);
						}

						return whenComplete;
					}

					function onceScrolled (callback) {
						if (callback) {
							prop.onComplete = onceScrolledCompleteWithCallback(callback);
						}

						tween.to(projects, 1, prop);
					}

					if (!projects) {
						projects = element.find('[data-api="behance.projects"]');
					}

					projects.addClass('isTransitioning');

					behanceProjectScropToTop(onceScrolled);
				}

				function behanceProjectsSetCurrent (index) {
					function findMatchIndex (matchId) {
						function find () {
							return scope.projects.map(function (list, index) {
								if (list.id === matchId) {
									return index;
								}
							}).filter(function (index) {
								return index !== undefined;
							})[0];
						}

						return find();
					}

					function navigateState (callback) {
						behanceProjectsNavigateState(scope.projects[scope.ref.currentIndex].id);

						if (callback) {
							callback();
						}
					}

					scope.ref.currentIndex = findMatchIndex(state.params.project) || 0;

					if (index !== undefined) {
						scope.ref.currentIndex = index;
					}

					behanceProjectsTransition(navigateState);
					behanceProjectsRender();
					behanceProjectsBroadcastCurrent();
				}

				function behanceProjectsBroadcastCurrent () {
					root.$broadcast('view.projects.set.current', scope.projects[scope.ref.currentIndex]);
				}

				function behanceProjectsNavigateState (id) {
					state.go('projects.project', { project : id });

					timeout.cancel(scope.timer.behanceProjectsWhenTransition);
					scope.timer.behanceProjectsWhenTransition = timeout(behanceProjectsWhenTransition(), 0);
				}

				function behanceProjectsControlClick (index) {
					function whenClick () {
						projects.children().each(behanceProjectsRenderEachProject);
					}

					var wait = 0;

					if (window.scrollY > 0) {
						wait = 1000;
					}

					delete scope.ref.hasBehanceProjectData;

					behanceProjectsSetCurrent(index);

					timeout.cancel(scope.timer.behanceProjectsControlClick);
					scope.timer.behanceProjectsControlClick = timeout(whenClick, wait);
				}

				function behanceProjectsControl () {
					if (scope.ref.currentIndex === undefined) {
						scope.ref.currentIndex = 0;
					}

					scope.$broadcast('behance.projects.control', {
						click : behanceProjectsControlClick
					});
				}

				function behanceProjectsCursor () {
					if (!cursor) {
						cursor = element.find('.cursor');
					}

					angular.element(win).bind('mousemove', behanceProjectsCursorMove);
				}

				function behanceProjectScropToContent () {
					function whenScrolled () {
						projectsWrapper.addClass('isScrolled');
					}

					if (window.scrollTop >= _window.outerHeight()) {
						whenScrolled();

						return;
					}

					tween.killTweensOf(_window);
					tween.to(_window, 2, {
						scrollTo : { y : _window.outerHeight() },
						ease : Expo.easeInOut,
						onComplete : whenScrolled
					});
				}

				function behanceProjectScropToTop (callback) {
					function whenScrolled () {
						projectsWrapper.removeClass('isScrolled');

						if (callback) {
							callback(behanceProjectScropToContent);
						}
					}

					if (window.scrollY === 0 || firstRun) {
						firstRun = false;

						whenScrolled();

						return;
					}

					tween.killTweensOf(_window);
					tween.to(_window, 2, {
						scrollTo : { y : 0 },
						ease : Expo.easeInOut,
						onComplete : whenScrolled
					});
				}

				function behanceProjectData (event, data) {
					timeout.cancel(scope.timer.behanceProjectsRender);
					scope.timer.behanceProjectsRender = timeout(behanceProjectsRender, 0);

					timeout.cancel(scope.timer.behanceProjectsSetCurrent);
					scope.timer.behanceProjectsSetCurrent = timeout(behanceProjectsSetCurrent, 0);
				}

				function projectsWrapperResize () {
					var winHeight = _window.outerHeight(),
						winWidth = _window.outerWidth();
					
					function whileResize () {
						var bleed = mediaquery().mobile ? 0 : gutter;

						winHeight = _window.outerHeight();
						winWidth = _window.outerWidth();

						tween.killTweensOf(projectsWrapper);
						tween.to(projectsWrapper, 1, {
							height : winHeight - bleed,
							x : bleed / 2,
							width : winWidth - bleed,
							y : bleed / 2
						});

						behanceProjectsRender();

						timeout.cancel(scope.timer.behanceProjectsWhenTransition);
						scope.timer.behanceProjectsWhenTransition = timeout(behanceProjectsWhenTransition(), 0);
					}

					if (!projectsWrapper) {
						projectsWrapper = element.children('div');
						
						tween.killTweensOf(projectsWrapper);
						tween.set(projectsWrapper, {
							height : 0,
							x : winWidth / 2,
							y : winHeight / 2,
							width : 0
						});
					}

					return whileResize();
				}

				function cursorTransition (event) {
					var behanceProjects = '[data-api="behance.projects"]',
						isPrev = '.isPrev',
						isNext = '.isNext',
						target = angular.element(event.target),
						prop = {
							opacity : 0,
							rotation : 0,
							ease : Bounce.easeOut
						};

					function hasSelector (selector) {
						return (target.closest(selector).length > 0 || target.children(selector).length > 0);
					}

					if (!cursor) {
						cursor = element.find('.cursor');
					}

					if (hasSelector(isPrev)) {
						prop.rotation = 180;
					}

					if (hasSelector(behanceProjects)) {
						prop.opacity = 1;

						if (!hasSelector(isPrev) && !hasSelector(isNext)) {
							prop.rotation = 90;
						}
					}

					tween.killTweensOf(cursor);
					tween.to(cursor, hasSelector(behanceProjects) ? 0.5 : 0, prop);
				}

				function init (event, projects) {
					_.each(projects, setSitemap);

					scope.projects = projects;

					if (!state.params.project) {
						behanceProjectsNavigateState(scope.projects[0].id);
					}

					timeout.cancel(scope.timer.behanceProjectsControl);
					scope.timer.behanceProjectsControl = timeout(behanceProjectsControl, 0);

					timeout.cancel(scope.timer.behanceProjectsRender);
					scope.timer.behanceProjectsRender = timeout(behanceProjectsRender, 0);

					timeout.cancel(scope.timer.behanceProjectsSetCurrent);
					scope.timer.behanceProjectsSetCurrent = timeout(behanceProjectsSetCurrent, 0);

					_window.bind('resize', onResize());
					
					scope.$broadcast('behance.projects.throbber.hide');
					
					root.$broadcast('viewProjects.cursor.assign.mouseMove', cursorTransition);
				}

				function destroy () {
					function eachTimer (timer, name) {
						timeout.cancel(timer);
					}

					_.each(scope.timer, eachTimer);

					tween.killTweensOf(element);

					_window.unbind('resize');

					root.$broadcast('view.projects.unset.current');
				}

				function onResize () {
					function whileResize (event) {
						projectsWrapperResize();
					}

					whileResize();

					return whileResize;
				}

				function onEnter (toState, fromState) {
					function whenEnter () {
						if (fromState.name === 'projects.project' && toState.name === 'projects' && !state.params.project && scope.projects) {
							behanceProjectsSetCurrent();
							behanceProjectsNavigateState(scope.projects[0].id);
						}

						if (
							Boolean(fromState.name && toState.name === 'projects.project') ||
							fromState.name === 'projects.project'
						) {
							return;
						}

						if (mediaquery().largemobile) {
							tween.set(element, { opacity : 0 });
							tween.to(element, 1, { opacity : 1 });

							return;
						}

						tween.killTweensOf(element);
						tween.set(element, { scale : 1.2, opacity : 0 });
						tween.to(element, 1, { scale : 1, opacity : 1, ease : Back.easeInOut, delay : fromState.name ? 0.2 : 0 });
					}

					anchorScroll();

					timeout.cancel(scope.timer.onEnter);
					scope.timer.onEnter = timeout(whenEnter, 1000);
				}

				function onExit () {
					if (!mediaquery().largemobile) {
						tween.killTweensOf(element);
						tween.to(element, 1, { y : '100%', opacity : 0 });
					}
				}

				scope.name = resource.name;
				scope.content = resource.content;

				scope.control = {};
				scope.control.cursor = {};
				scope.control.cursor.mousemove = cursorTransition;

				scope.ref = {};

				scope.timer = {};

				scope.$on('behance.projects.data', init);
				scope.$on('behance.project.data', behanceProjectData);
				scope.$on('$destroy', destroy);

				root.$broadcast('globalHeader.show');

				sitemap.current('projects', 'root');
				
				stateChange(scope, { name : 'projects' }).when({ onEnter : onEnter, onExit : onExit });
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
