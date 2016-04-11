(function projects () {
	'use strict';

	var dependencies = [
			'view.projects.project'
		],

		urlRouter,

		ref = {};

	angular
		.module('view.projects', dependencies)
		.config([
			'$stateProvider',
			'$urlRouterProvider',
			function config (stateProvider, urlRouterProvider) {
				urlRouter = urlRouterProvider;

				stateProvider.state({
					name : 'projects',
					url : '/projects',
					resolve : {
						resource : ['async', function resource (async) {
							if (!ref.resource) {
								ref.resource = async({ url : 'app/view/projects/projects.json' }).get().$promise;
							}

							return ref.resource;
						}]
					},
					views : {
						'section' : {
							templateUrl : 'app/view/projects/projects.html',
							controller : 'view.projects.controller'
						}
					}
				});
			}
		])
		.run([
			'sitemap',
			function run (sitemap) {
				sitemap.add('projects', { name : 'projects', route : 'projects' });
			}
		])
		.service('view.projects.events', [
			'$window',
			'$state',
			'$anchorScroll',
			'scroll',
			function events (_win, state, anchorScroll, scroll) {
				var scope,
					element,
					win = angular.element(_win);

				function onStateChangeStart (event, toState, toParams, fromState, fromParams, options) {
					if (toState.name !== 'projects') {
						return;
					}

					event.preventDefault();
				}

				this.onStateChangeSuccess = function (callback) {
					scope.$on('$stateChangeSuccess', callback);
				};

				this.init = function (scopeRef, elementRef) {
					scope = scopeRef;
					element = elementRef;

					scope.$on('$stateChangeStart', onStateChangeStart);
				};
			}
		])
		.service('view.projects.behanceProjectsData', [
			'$state',
			'$stateParams',
			function behanceData (state, stateParams) {
				var scope;

				this.ready = function (event, projects) {
					scope.projects = projects;

					if (stateParams.project) {
						return;
					}

					state.transitionTo('projects.project', { project : projects[0].id }, { location : 'replace' });
				};

				this.onData = function (callback) {
					scope.$on('behance.projects.data', callback);
				};

				this.init = function (scopeRef, noCallback) {
					scope = scopeRef;

					if (noCallback) {
						return;
					}

					this.onData(this.ready);
				};
			}
		])
		.service('view.projects.behanceProjectsHeight', [
			'$rootScope',
			'$window',
			'$document',
			'$timeout',
			'mediaquery',
			function behanceProjectsHeight (root, _win, doc, timeout, mediaquery) {
				var scope,
					win = angular.element(_win);

				this.set = function () {
					if (mediaquery().mobile) {
						scope.style.behanceProjects.height = win.height() * 0.5;

						return;
					}

					scope.style.behanceProjects.height = win.height();
				};

				this.update = function () {
					if(scope.$$pahse) {
						return;
					}

					scope.$apply(this.set.bind(this));
				}.bind(this);

				this.projectData = function (event, data) {
					timeout.cancel(scope.behanceProjectsHeight);
					scope.behanceProjectsHeightTimer = timeout(this.set, 0);
				}.bind(this);

				this.init = function (scopeRef) {
					scope = scopeRef;

					scope.$on('behance.project.data', this.projectData);

					this.set();

					win.bind('resize', this.update);
				}.bind(this);
			}
		])
		.service('view.projects.swiper', [
			'$state',
			'$stateParams',
			'$timeout',
			'view.projects.behanceProjectsData',
			'view.projects.events',
			function swiper (state, stateParams, timeout, behanceProjectsData, events) {
				var element,
					scope,
					swiper,
					swiperContainer,

					config = {
						centeredSlides : true,
						grabCursor : true,
						observer : true,
						observeParents : true,
						slidesPerView : 2,
						watchSlidesProgress : true,
						watchSlidesVisibility : true
					};

				this.self = function () {
					return swiper;
				};

				this.slideTo = function (index) {
					if (!swiper) {
						console.warning('Swiper is not ready');
					}

					if (!stateParams.project) {
						index = 0;
					}

					if ((index !== undefined || index !== 0) && stateParams.project && scope.projects) {
						index = _.findIndex(scope.projects, { id : stateParams.project });
					}

					if (!stateParams.project) {
						return;
					}

					swiper.slideTo(index);
				};

				this.onSliderMove = function () {
					scope.isSwiping = true;
					scope.$apply();
				};

				this.onTransitionEnd = function () {
					state.go('projects.project', { project : scope.projects[swiper.activeIndex].id });

					timeout.cancel(scope.swiperTransitionEndTimer);
					scope.swiperTransitionEndTimer = timeout(function () {
						delete scope.isSwiping;
					}, 500);
				};

				this.trigger = function () {
					swiperContainer.find('li').addClass('swiper-slide');
					swiper = new Swiper(swiperContainer, config);

					swiper.on('onSliderMove', this.onSliderMove);
					swiper.on('onTransitionEnd', this.onTransitionEnd);

					events.onStateChangeSuccess(this.slideTo);

					this.slideTo();
				}.bind(this);

				this.setup = function () {
					timeout.cancel(scope.timer.swiperSetup);
					scope.timer.swiperSetup = timeout(this.trigger);
				}.bind(this);

				this.init = function (scopeRef, elementRef) {
					element = elementRef;
					scope = scopeRef;

					swiperContainer = element.children('nav');

					behanceProjectsData.init(scope, true);
					behanceProjectsData.onData(this.setup);
				};
			}
		])
		.controller('view.projects.controller', [
			'$rootScope',
			'$scope',
			'$element',
			'resource',
			'view.projects.behanceProjectsData',
			'view.projects.behanceProjectsHeight',
			'view.projects.events',
			'view.projects.swiper',
			function controller (root, scope, element, resource, behanceProjectsData, behanceProjectsHeight, events, swiper) {
				scope.content = resource.content;
				scope.name = resource.name;
				scope.route = resource.route;

				scope.style = {};
				scope.style.behanceProjects = {};

				scope.timer = {};
				
				scope.$emit('update.view.data', { name : resource.name, route : resource.route });

				root.$broadcast('globalHeader.show');

				behanceProjectsData.init(scope);
				behanceProjectsHeight.init(scope);
				events.init(scope, element);
				swiper.init(scope, element);
			}
		]);
}());