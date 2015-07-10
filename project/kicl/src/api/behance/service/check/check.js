(function check () {
	'use strict';

	var service = [
		'behanceReference',
		function service (reference) {

			var check = new Check();

			function Check () {}

			Check.prototype.project = function (project) {
				return project.owners[0].username === reference.resource.data.userName;
			};

			Check.prototype.projects = function (project) {
				return project.owners[0].username === reference.resource.data.userName;
			};

			this.project = function (project) {
				if (Object.prototype.toString.call(project) === '[object Array]') {
					return project.filter(check.projects);
				}

				if (check.project(project)) {
					return project;
				}

				return {};
			};
		}
	];

	angular.module('behance.service.check', [])
		.service('behanceCheck', service);
}());
