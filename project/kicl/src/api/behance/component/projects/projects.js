(function () {
	'use strict';

	var controller = [
			'$rootScope', '$scope', 'behanceReference',
			function controller (root, scope, reference) {
				var callback = {
						data : function (data) {
							reference.component.projects.resolved = data.$resolved;

							scope.projects = _.map(data.projects, eachProject).filter(checkProject);
						}
					}
				
				function toTime (stamp) {
					return moment(stamp * 1000).format('MMMM, YYYY');
				}

				function checkProject (project) {
					return project.owners[0].username = reference.resource.data.userName;
				}

				function eachProject (project) {
					project.created_on = toTime(project.created_on);
					project.published_on = toTime(project.published_on);

					return project;
				}

				if (!reference.component.projects.promise) {
					reference.component.projects.promise = reference.api.projects().$promise;
				}

				reference.component.projects.promise.then(callback.data);
			}
		]

	function directive (async) {
		return {
			restrict: 'E',
			replace: true,
			scope : {
				'isolate' : '&'
			},
			templateUrl : 'api/behance/component/projects/projects.html',
			controller : controller
		};
	}

	angular.module('behance.component.projects', [])
		.directive('behanceProjects', [
			directive
		]);
}());
