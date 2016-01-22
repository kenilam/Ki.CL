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
		service = {
			motion : [
				'$window',
				'$timeout',
				'mediaquery',
				function motion (win, timeout, mediaquery) {
					var root,
						scope,
						_doc = angular.element(document),
						_win = angular.element(win),
						container,
						projects,
						project,
						figure,
						shadows,
						shadow,

						timer = {},

						setting = {
							duration : 1,
							ease : Expo.easeOut,
							distance : {
								x : 0.02,
								y : 0.04
							}
						},

						property = {
							container : { opacity : 1, delay : 1 },
							project : {},
							figure : {},
							shadows : { opacity : mediaquery().mobile ? 0 : 1 },
							shadow : {}
						},

						control = {
							enable : function () {
								property.shadows = Object.create({ opacity : 1 });

								_doc.bind('mousemove', control.move);
								animate();
							},
							disable : function () {
								property.project = Object.create({ rotationX : 0, rotationY : 0 });
								property.shadows = Object.create({ opacity : 0 });

								_doc.unbind('mousemove');
								animate();
							},
							assign : {
								current : function () {
									function eachProject (index, item) {
										angular.element(item).removeClass('isCurrent');
									}

									project.each(eachProject);
								}
							},
							move : function (event) {
								var x = ((_win.width() / 2) - (event.pageX - _doc.scrollLeft())) * setting.distance.x,
									y = ((_win.height() / 2) - (event.pageY - _doc.scrollTop())) * setting.distance.y;

								property.project = Object.create({
									rotationX : -1 * y,
									rotationY : x
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
								control[ mediaquery().mobile ? 'disable' : 'enable' ]();
							}
						};

					function construct (callback) {
						shadows
							.addClass('isShadow');

						shadow
							.children()
								.css('background-color', '#000')
							.children().remove();

						container
							.empty()
							.delay(500)
							.queue(function () {
								container
									.append(shadows)
									.append(projects);

								if (callback) {
									callback();
								}
							});
					}

					function events () {
						_win.bind('resize', control.resize).trigger('resize');
						_doc.bind('mousemove', control.move);

						timer.stateChangeSuccess = scope.$on('$stateChangeSuccess', stateChangeSuccess);

						scope.$on('$destroy', destroy);
					}

					function animate () {
						TweenMax.killTweensOf([project, figure, shadows, shadow]);
						
						TweenMax.to(project, setting.duration, property.project, setting.ease);
						TweenMax.to(figure, setting.duration, property.figure, setting.ease);
						TweenMax.to(shadows, setting.duration, property.shadows, setting.ease);
						TweenMax.to(shadow, setting.duration, property.shadow, setting.ease);
					}

					function stateChangeSuccess (event, toState) {
						if (toState.name !== 'projects.project') {
							return;
						}

						control.assign.current();
					}

					function destroy () {
						function eachTimer (timer, name) {
							if (typeof timer === 'function') {
								timer();

								return;
							}

							timeout.cancel(timer);
						}

						_.each(scope.timer, eachTimer);
					}

					function render () {
						TweenMax.killTweensOf(container);
						TweenMax.to(container, setting.duration, property.container, setting.ease);
					}

					function ready () {
						construct(render);
						animate();
						events();
					}

					function prepare (whenComplete) {
						projects = angular.element('[data-api="behance.projects"]');
						project = projects.children('li');
						figure = project.children('figure');
						shadows = projects.clone();
						shadow = shadows.children('li');
						container = projects.parent();

						TweenMax.killTweensOf(container);
						TweenMax.set(container, { opacity: 0, onComplete : whenComplete });
					}

					function init () {
						prepare(ready);
					}

					function trigger ($scope) {
						scope = $scope;

						return init;
					}

					return trigger;
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
								if (!mediaquery().mobile) {
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

							function eachTimer (timer, name) {
								timeout.cancel(timer);
							}

							_.each(scope.timer, eachTimer);
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
						scope.timer.viewProjectsMotion = timeout(viewProjectsMotion(scope), 0);
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
