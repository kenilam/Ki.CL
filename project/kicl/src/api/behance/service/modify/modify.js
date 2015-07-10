(function modify () {
	'use strict';

	var service = [
		'$timeout', 'behanceReference', 'behanceTime',
		function service (timeout, reference, time) {
			var modify = new Modify(),

				storage = {};

			function Modify () {}

			function resetStorage () {
				storage = {};
			}

			function projectModule (module) {
				if (module.type === 'image') {
					module.src = module.sizes[reference.resource.data.widget.project.config.module.image.size];
				}
				return module;
			}

			Modify.prototype.storage = function (object, value) {
				storage[object] = value;

				timeout(resetStorage, 0);
			};

			Modify.prototype.experience = function (experience) {
				var stamp = new Date(experience.start_date.split("-").reverse().join("-")).getTime();

				experience.start_date = moment(stamp).format('MMMM, YYYY');

				return experience;
			};

			Modify.prototype.project = function (project) {
				if (!project.modified) {
					project.id = project.id.toString();
					
					project.created_on_datetime = time.transform(project.created_on).datetime();
					project.created_on = time.transform(project.created_on).fromNow(true);

					project.published_on_datetime = time.transform(project.published_on).datetime();
					project.published_on = time.transform(project.published_on).fromNow(true);

					project.covers = project.covers[reference.resource.data.widget.projects.config.covers.size] || project.covers.original;

					if (project.dimensions) {
						project.dimensions  = project.dimensions[reference.resource.data.widget.projects.config.covers.size] || project.dimensions.original;
					}

					if (project.modules) {
						project.modules = _.map(project.modules, projectModule);
					}

					if (storage.project && storage.project.projectsRoute) {
						project.route = storage.project.projectsRoute + '.project({project: "' + project.id + '",' + 'name:"' + project.name + '"})';
					}

					project.modified = true;
				}

				return project;
			};

			return new Modify();
		}
	];

	angular.module('behance.service.modify', [])
		.service('behanceModify', service);
}());
