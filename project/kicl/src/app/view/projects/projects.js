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
		service = {
			motion : [
				'$window',
				'mediaquery',
				function motion (win, mediaquery) {
					var project,
						list,
						shadow,

						setting = {
							duration : 1,
							ease : Back.easeOut.config(2),
							distance : {
								x : 0.04,
								y : 0.02
							}
						},

						property = {
							list : {},
							project : {},
							shadow : { opacity : mediaquery().largemobile ? 0 : 1 },

							x : 0,
							y : 0
						},

						tween = {
							list : {},
							project : {},
							shadow : {},

							
						},

						control = {
							enable : function () {
								property.shadow = Object.create({ opacity : 1 });

								angular.element(document).bind('mousemove', control.move);

								animate();
							},
							disable : function () {
								property.project = Object.create({ rotationY : 0 });
								property.shadow = Object.create({ opacity : 0 });

								angular.element(document).unbind('mousemove');

								animate();
							},
							move : function (event) {
								property.x = event.clientX;
								property.y = event.clientY;

								var x = ((win.outerWidth / 2) - property.x) * setting.distance.x,
									y = ((win.outerHeight / 2) - property.y) * setting.distance.y;

								property.project = Object.create({
									rotationX : -1 * y,
									rotationY : x
								});

								property.list = Object.create({
									rotationY : -1 * x,
									scaleX : 1 + (Math.abs(x) / 200),
									scaleY : 1 + (Math.abs(y) / 200)
								});

								property.shadow = Object.create({
									rotationX : -1 * y,
									rotationY : x,

									x : x,
									y : y
								});

								animate();
							},
							resize : function () {
								control[ mediaquery().largemobile ? 'disable' : 'enable' ]();
							}
						};

					function construct () {
						project = angular.element('[data-api="behance.projects"]');
						
						list = project.find('li figure');

						shadow = project.clone();

						shadow
							.addClass('isShadow')
							.children()
								.css('background-color', '#000')
							.children().remove();

						project.after(shadow);
					}

					function events () {
						angular.element(document).bind('mousemove', control.move);
						angular.element(win).bind('resize', control.resize);
					}

					function animate () {
						tween.list = new TweenMax.to(list, setting.duration, property.list, setting.ease);
						tween.project = new TweenMax.to(project, setting.duration, property.project, setting.ease);
						tween.shadow = new TweenMax.to(shadow, setting.duration, property.shadow, setting.ease);
					}

					function init () {
						construct();
						animate();
						events();
					}

					return init;
				}
			]
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
			'viewProjectsMotion',
			function controller (root, scope, element, timeout, resource, sitemap, mediaquery, behanceReference, viewProjectsMotion) {
				var emit = {
						backdrop : {
							add : function (image) {
								if (!mediaquery().largemobile) {
									timeout.cancel(scope.timer.addBackdrop);
									timeout.cancel(scope.timer.removeBackdrop);

									scope.timer.addBackdrop = timeout(function () {
										scope.$emit('backdrop.add', {
											image : image
										});
									}, 1000);
								}
							},
							remove : function (image) {
								timeout.cancel(scope.timer.addBackdrop);
								timeout.cancel(scope.timer.removeBackdrop);

								scope.timer.removeBackdrop = timeout(function () {
									scope.$emit('backdrop.remove', {
										image : image
									}, 1000);
								});
							}
						}
					},
					set = {
						sitemap : function () {
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
					},
					control = {
						mouse : {
							over : function (project) {
								emit.backdrop.add(project.covers);
							},
							leave : function (project) {
								if (scope.current) {
									emit.backdrop.add(scope.current.covers);
									return;
								}

								emit.backdrop.remove(project.covers);
							}
						},
						current : {
							set : function (event, current) {
								scope.current = current;
							},
							unset : function () {
								delete scope.current;
							}
						},
						destroy : function () {
							scope.$emit('backdrop.remove');
						}
					};

				function init (event, projects) {
					function ready () {
						_.each(projects, set.sitemap());
						
						scope.$broadcast('behance.projects.throbber.hide');
						scope.$broadcast('behance.projects.control', {
							mouseover : control.mouse.over,
							mouseleave : control.mouse.leave
						});

						timeout.cancel(scope.timer.viewProjectsMotion);
						scope.timer.viewProjectsMotion = timeout(viewProjectsMotion, 1000);
					}

					timeout.cancel(scope.timer.ready);
					scope.timer.ready = timeout(ready, 0);
				}

				scope.name = resource.name;
				scope.content = resource.content;

				scope.timer = {};
				scope.control = {};
				scope.control.mouseover = control.mouseover;
				scope.control.mouseleave = control.mouseleave;

				scope.$on('behance.projects.data', init);
				scope.$on('behance.projects.set.current', control.current.set);
				scope.$on('behance.projects.unset.current', control.current.unset);
				scope.$on('$destroy', control.destroy);

				root.$broadcast('globalHeader.show');
				root.$broadcast('globalFooter.logo.show');

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
		.service('viewProjectsMotion', service.motion)
		.controller('view.projects.controller', controller);
}());
