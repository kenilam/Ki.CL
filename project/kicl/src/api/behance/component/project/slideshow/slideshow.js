(function project () {
	'use strict';

	var controller = [
			'$rootScope', '$scope', '$element', '$timeout', 'behanceReference',
			function (root, scope, element, timeout, reference) {
				var control = {
						get : {
							resource : function () {
								reference.resource.loader.then(callback.resource);
							}
						},
						set : {
							current : function (module) {
								scope.projectSlideshow.current = _.findWhere(scope.projectSlideshow.modules, module) || scope.projectSlideshow.modules[0];
							}
						}
					},
					callback = {
						resource : function (resource) {
							scope.projectSlideshow.resource = resource.data.widget.project.widget.slideshow;
						}
					};

				function data (event, project) {
					scope.projectSlideshow.name = project.name;
					scope.projectSlideshow.modules = project.modules;
					scope.projectSlideshow.current = project.modules[0];
				}

				function show (event, params) {
					if (params.module) {
						control.set.current(params.module);
					}

					scope.projectSlideshow.show = true;
					root.$broadcast('behance.project.slideshow.on.show');
				}

				function hide () {
					scope.projectSlideshow.show = false;
					root.$broadcast('behance.project.slideshow.on.hide');
				}

				scope.projectSlideshow = {};
				scope.projectSlideshow.show = false;
				scope.projectSlideshow.control = {};
				scope.projectSlideshow.control.close = hide;
				scope.projectSlideshow.control.set = control.set;

				scope.$on('behance.project.slideshow.data', data);
				scope.$on('behance.project.slideshow.show', show);
				scope.$on('behance.project.slideshow.hide', hide);

				timeout(control.get.resource, 0);
			}
		];

	function directive (async) {
		return {
			restrict: 'E',
			replace: true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'api/behance/component/project/slideshow/slideshow.html',
			controller : controller
		};
	}

	angular.module('behance.component.project.slideshow', [])
		.directive('behanceProjectSlideshow', [
			directive
		]);
}());