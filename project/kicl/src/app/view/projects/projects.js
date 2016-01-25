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
			'$window',
			'$element',
			'$timeout',
			'mediaquery',
			'resource',
			'sitemap',
			'statechange',
			'tween',
			function controller (root, scope, win, element, timeout, mediaquery, resource, sitemap, statechange, tween) {
				var projects,
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

						return;
					}
					
					root.$broadcast('view.projects.set.current', scope.projects[index]);
				}

				function behanceProjectsRender () {
					if (!projects) {
						projects = element.find('[data-api="behance.projects"]');
					}

					projects.children().each(behanceProjectsRenderEachProject);
				}

				function behanceProjectsControlClick (index) {
					scope.ref.currentIndex = index;

					tween.to(projects, 1, { x : (-100 * index) + '%', ease : Back[index > scope.ref.currentIndex ? 'easeIn' : 'easeOut'] });

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

				function init (event, projects) {
					_.each(projects, setSitemap);

					scope.projects = projects;

					timeout.cancel(scope.timer.behanceProjectsControl);
					scope.timer.behanceProjectsControl = timeout(behanceProjectsControl, 0);

					timeout.cancel(scope.timer.behanceProjectsRender);
					scope.timer.behanceProjectsRender = timeout(behanceProjectsRender, 0);
					
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

				scope.name = resource.name;
				scope.content = resource.content;

				scope.ref = {};

				scope.timer = {};

				scope.$on('behance.projects.data', init);
				scope.$on('$destroy', destroy);

				root.$broadcast('globalHeader.show');

				sitemap.current('projects', 'root');
				
				statechange(scope, { name : 'projects' }).when({
					onEnter : function (toState, fromState) {
						if (fromState.name === 'projects.project') {
							return;
						}

						if (!mediaquery().largemobile) {
							tween.killTweensOf(element);
							tween.set(element, { scale : 1.2, y : '100%', opacity : 0 });
							tween.to(element, 1, { scale : 1, y : '0%', opacity : 1, ease : Back.easeInOut, delay : fromState.name ? 0.2 : 0 });
						}
					},
					onExit : function () {
						if (!mediaquery().largemobile) {
							tween.killTweensOf(element);
							tween.to(element, 1, { y : '100%', opacity : 0 });
						}
					}
				});
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
