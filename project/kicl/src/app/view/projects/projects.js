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
			'sitemap',
			'statechange',
			'tween',
			function controller (root, scope, state, win, element, timeout, mediaquery, resource, sitemap, statechange, tween) {
				var _window = angular.element(win),
					projectsWrapper,
					projects,
					projectUiView,
					cursor;

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
					var project = angular.element(list);

					project.removeClass('isNext isPrev');

					if (index < scope.ref.currentIndex) {
						project.addClass('isPrev');

						return;
					}

					if (index > scope.ref.currentIndex) {
						project.addClass('isNext');
					}
				}

				function behanceProjectsRender () {
					if (!projects) {
						projects = element.find('[data-api="behance.projects"]');
					}

					projects.children().each(behanceProjectsRenderEachProject);
				}

				function behanceProjectsWhenTranslate (callback) {
					if (!projectUiView) {
						projectUiView = element.find('section[ui-view=project]');
					}

					tween.set(projectUiView, { opacity : 0 });

					function whenTranslate () {
						tween.to(projectUiView, 1, { opacity : 1 });
						
						if (callback) {
							callback();
						}
					}

					return whenTranslate;
				}

				function behanceProjectsTranslate (callback) {
					tween.to(projects, 1, {
						x : (-100 * scope.ref.currentIndex) + '%',
						ease : Back.easeOut,
						onComplete : behanceProjectsWhenTranslate(callback)
					});
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

					scope.ref.currentIndex = findMatchIndex(state.params.project) || 0;

					if (index !== undefined) {
						scope.ref.currentIndex = index;
					}

					behanceProjectsTranslate(function () {
						behanceProjectsNavigateState(scope.projects[scope.ref.currentIndex].id);
					});
					behanceProjectsRender();
					behanceProjectsBroadcastCurrent();
				}

				function behanceProjectsBroadcastCurrent () {
					root.$broadcast('view.projects.set.current', scope.projects[scope.ref.currentIndex]);
				}

				function behanceProjectsNavigateState (id) {
					state.go('projects.project', { project : id });
				}

				function behanceProjectsControlClick (index) {
					behanceProjectsSetCurrent(index);

					projects.children().each(behanceProjectsRenderEachProject);
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

				function resizeProjectsWrapper () {
					var gutter = 40;
					
					function whileResize () {
						var winHeight = _window.outerHeight(),
							winWidth = _window.outerWidth(),
							bleed = mediaquery().mobile ? 0 : gutter;

						tween.to(projectsWrapper, 1, {
							height : winHeight - bleed,
							x : bleed / 2,
							width : winWidth - bleed,
							y : bleed / 2
						});
					}

					if (!projectsWrapper) {
						projectsWrapper = element.children('div');
					}

					return whileResize();
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
					
					scope.$broadcast('behance.projects.throbber.hide');
				}

				function destroy () {
					function eachTimer (timer, name) {
						timeout.cancel(timer);
					}

					_.each(scope.timer, eachTimer);

					tween.killTweensOf(element);

					angular.element(win).unbind('mousemove');

					root.$broadcast('view.projects.unset.current');
				}

				function onResize () {
					function whileResize (event) {
						resizeProjectsWrapper();
					}

					whileResize();

					return whileResize;
				}

				function onEnter (toState, fromState) {
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

				function onExit () {
					if (!mediaquery().largemobile) {
						tween.killTweensOf(element);
						tween.to(element, 1, { y : '100%', opacity : 0 });
					}
				}

				scope.name = resource.name;
				scope.content = resource.content;

				scope.ref = {};

				scope.timer = {};

				scope.$on('behance.projects.data', init);
				scope.$on('$destroy', destroy);

				_window.bind('resize', onResize());

				root.$broadcast('globalHeader.show');

				sitemap.current('projects', 'root');
				
				statechange(scope, { name : 'projects' }).when({ onEnter : onEnter, onExit : onExit });
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
