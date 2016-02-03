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
				var inital = true,
					projectsWrapper,
					projectsHolder,
					projectsUiView;

				function projectLoad () {
					projectsUiView = element.find('[ui-view=project]');

					projectsUiView.attr('hidden', true);
				}

				function projectReady () {
					projectsUiView = element.find('[ui-view=project]');
					
					projectsUiView.attr('hidden', false);
				}

				function navigateToProjects (id) {
					inital = false;
					
					projectReady();

					state.go('projects.project', { project : id !== undefined ? id : scope.ref.current.id });
				}

				function projectsTransition (callback) {
					var prop = {
							x : -1 * (100 * scope.ref.currentIndex) + '%',
							// delay : 1,
							ease : mediaquery().largemobile ? Expo.easeIn : Back.easeOut,
							onComplete : callback
						};

					if (scope.ref.currentIndex === undefined) {
						timeout.cancel(scope.timer.projectsTransition);
						scope.timer.projectsTransition = timeout(projectsTransition, 0);

						return;
					}

					projectsHolder = element.find('.projectsWrapper ul');

					tween.killTweensOf(projectsHolder);

					if (inital) {
						delete prop.ease;
						delete prop.delay;

						tween.set(projectsHolder, prop);
					}

					tween.to(projectsHolder, 0.5, prop);
				}

				function projectsEvents () {
					function eachProject (prop, index) {
						var project = element.find('.projectsWrapper ul li:nth-child(' + (index + 1) + ') a');

						project.bind('click touchstart', onClick(index));
					}

					scope.ref.projects.forEach(eachProject);
				}

				function setCurrentIndex (event, index) {
					scope.ref.currentIndex = index;

					projectsTransition(navigateToProjects);
				}

				function setCurrent (event, current) {
					if (!current) {
						scope.ref.current = scope.ref.projects[0].id;
						
						navigateToProjects(scope.ref.current);

						return;
					}

					scope.ref.current = current;

					root.$broadcast('view.projects.set.current', scope.ref.current);
				}

				function setProjects (data, projects) {
					scope.ref.projects = projects;

					if (inital) {
						projectsEvents();
					}
				}

				function onClick (index) {
					function whenClick (event) {

					}

					return whenClick;
				}

				function onEnter (toState, fromState) {
					if (toState.name === 'projects.project' && (!fromState || fromState.name !== 'projects')) {
						return;
					}

					tween.killTweensOf(element);
					tween.set(element, { scale : 1.2, opacity : 0 });
					tween.to(element, 1, { scale : 1, opacity : 1, delay : 1 });
				}

				function destroy () {
					projectsWrapper = element.find('.projectsWrapper');

					tween.set(projectsWrapper, { css : { backgroundColor : projectsWrapper.css('background-color') } });

					root.$broadcast('view.projects.unset.current', scope.ref.current);
				}

				scope.ref = {};
				scope.timer = {};

				scope.$on('behance.projects.data', setProjects);
				scope.$on('behance.projects.set.current', setCurrent);
				scope.$on('behance.projects.set.currentIndex', setCurrentIndex);
				scope.$on('behance.project.load', projectLoad);
				scope.$on('behance.project.data', projectReady);

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
