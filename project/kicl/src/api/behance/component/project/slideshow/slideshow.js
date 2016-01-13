(function project () {
	'use strict';

	var controller = [
			'$scope', '$timeout', 'behanceReference',
			function (scope, timeout, reference) {
				var control = {
						get : {
							resource () {
								reference.resource.loader.then(callback.resource);
							}
						}
					},
					callback = {
						resource : function (resource) {
							scope.projectSlideshow.resource = resource.data.widget.project.widget.slideshow;
						}
					}

				function data (event, modules) {
					scope.projectSlideshow.modules = modules;
				}

				function show () {
					scope.projectSlideshow.show = true;
				}

				function hide () {
					scope.projectSlideshow.show = false;;
				}

				scope.projectSlideshow = {};
				scope.projectSlideshow.show = false;
				scope.projectSlideshow.control = {};
				scope.projectSlideshow.control.close = hide;

				scope.$on('behance.project.slideshow.data', data);
				scope.$on('behance.project.slideshow.show', show);
				scope.$on('behance.project.slideshow.hide', hide);

				timeout(control.get.resource, 0);
			}
		]

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