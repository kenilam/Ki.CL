(function projects () {
	'use strict';

	var dependencies = [],

		ref = {};

	angular
		.module('view.projects.project', dependencies)
		.config(['$stateProvider',
			function config (stateProvider) {
				stateProvider.state({
					'name' : 'projects.project',
					'url' : '/:project',
					'resolve' : {
						'resource' : ['async', function resource (async) {
							if (!ref.resource) {
								ref.resource = async({ url : 'app/view/projects/project/project.json' }).get().$promise;
							}

							return ref.resource;
						}]
					},
					'views' : {
						'project' : {
							'templateUrl' : 'app/view/projects/project/project.html',
							'controller' : 'view.projects.project.controller'
						}
					}
				});
			}
		])
		.service('view.projects.project.current', [
			'$rootScope',
			'$window',
			'$timeout',
			'$stateParams',
			function current (root, _window, timeout, stateParams) {
				var scope;

				function setCurrent () {
					scope.$emit('view.project.set.current', stateParams.project);
				}

				function unsetCurrent () {
					scope.$emit('view.project.unset.current');
				}

				function stateChangeSuccess () {
					timeout.cancel(scope.projectSetCurrentTimer);
					scope.projectSetCurrentTimer = timeout(setCurrent, 0);
				}

				this.assign = function (scopeRef) {
					scope = scopeRef;

					setCurrent();

					scope.$on('$stateChangeSuccess', stateChangeSuccess);
					scope.$on('$destroy', unsetCurrent);
				};
			}
		])
		.service('view.projects.project.slideshow.swiper', [
			'$rootScope',
			'$timeout',
			function swiper (root, timeout) {
				var scope,

					swiper,
					container,
					wrapper,

					config = {
						centeredSlides : true,
						grabCursor : true,
						observer : true,
						observeParents : true,
						slidesPerView : 1,
						speed : 800,
						watchSlidesProgress : true,
						watchSlidesVisibility : true
					};

				function onTransitionEnd () {
					root.$broadcast('behance.project.slideshow.currentIndex', swiper.activeIndex);
				}

				function trigger () {
					if (!swiper) {
						swiper = new Swiper(container, config);

						swiper.on('onTransitionEnd', onTransitionEnd);
					}
				}

				function slideTo (index) {
					function whenSlide () {
						if (!swiper) {
							return;
						}

						swiper.slideTo(index);
					}

					return whenSlide;
				}

				this.set = function (index) {
					wrapper.children('li').addClass('swiper-slide');

					timeout.cancel(scope.timer.swiperSet);
					scope.timer.swiperSet = timeout(trigger	);
				};

				this.setCurrent = function (index) {
					timeout.cancel(scope.timer.swiperSetCurrent);
					scope.timer.swiperSetCurrent = timeout(slideTo(index), 300);
				};

				this.assign = function (scopeRef) {
					scope = scopeRef;

					container = angular.element('[data-api="behance.project.slideshow"] .swiper');
					wrapper = container.children('ul');

					if (!container.hasClass('swiper-container')) {
						container.addClass('swiper-container');
					}

					if (!wrapper.hasClass('swiper-wrapper')) {
						wrapper.addClass('swiper-wrapper');
					}
				};
			}
		])
		.service('view.projects.project.slideshow', [
			'view.projects.project.slideshow.swiper',
			function slideshow (swiper) {
				var scope;
				
				this.show = function () {
					swiper.set();

					scope.$emit('overlay.set');
				};

				this.hide = function () {
					scope.$emit('overlay.unset');
				};

				this.setCurrent = function (event, index) {
					swiper.setCurrent(index);
				};
				
				this.assign = function (scopeRef) {
					scope = scopeRef;

					swiper.assign(scope);

					scope.$on('behance.project.slideshow.on.show', this.show);
					scope.$on('behance.project.slideshow.on.hide', this.hide);
					scope.$on('behance.project.slideshow.setCurrent', this.setCurrent);
				};
			}
		])
		.service('view.projects.project.data', [
			'$timeout',
			'sitemap',
			function projectData (timeout, sitemap) {
				var scope,
					resource;

				this.loaded = function (event, project) {
					timeout.cancel(scope.projectDataTimer);
					scope.projectDataTimer = timeout(function () {
						scope.projectLoaded = true;
						scope.$broadcast('view.projects.project.throbber.hide');
					}, 1000);

					scope.$emit('update.view.data', {
						name : 'projects.' + resource.name,
						route : resource.route.replace('.project', '.' + project.name)
					});

					sitemap.add(project.id, { name : 'projects', route : 'projects.project({project:' + project.id + '})' }, 'projects');
				};

				this.assign = function (scopeRef, resourceRef) {
					scope = scopeRef;
					resource = resourceRef;

					scope.$on('behance.project.data', this.loaded);
				};
			}
		])
		.controller('view.projects.project.controller', [
			'$scope',
			'$stateParams',
			'$anchorScroll',
			'resource',
			'view.projects.project.current',
			'view.projects.project.data',
			'view.projects.project.slideshow',
			function controller (scope, stateParams, anchorScroll, resource, currentProject, projectData, projectSlideshow) {
				currentProject.assign(scope);
				projectData.assign(scope, resource);
				projectSlideshow.assign(scope);

				anchorScroll();
			}
		]);
}());