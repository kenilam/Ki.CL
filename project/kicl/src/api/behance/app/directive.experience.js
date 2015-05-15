(
	function (app) {
		'use strict';

		app
			.service('behanceExperience_link',
				[
					'$rootScope',
					function (root) {
						return function (scope, elm) {
							root.api.behance.resource.$promise.then(function (resource) {
								if (!root.api.behance.resource.experience) {
									root.api.behance.resource.experience = root.api.behance.experience();
								}

								root.api.behance.resource.experience.$promise.then(function (data) {
									scope.experience.list = data.work_experience;
									scope.experience.content = resource.widget.experience.content;
								});
							});

							scope.experience = {};
						};
					}
				]
			)
			.directive('behanceExperience',
				[
					'behanceExperience_link',
					function (link) {
						return {
							restrict: 'AE',
							scope: {},
							replace: true,
							templateUrl: 'api/behance/template/experience.html',
							link : link
						};
					}
				]
			);
	}
)(behance);
