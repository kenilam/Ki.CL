(
	function (app) {
		'use strict';

		app
			.service('behanceIntro_link',
				[
					'$rootScope',
					function (root) {
						return function (scope, elm) {
							root.api.behance.resource.$promise.then(function () {
								if (!root.api.behance.resource.profile) {
									root.api.behance.resource.profile = root.api.behance.profile();
								}

								root.api.behance.resource.profile.$promise.then(function (data) {
									scope.intro = {
										about : data.user.sections.About.split('\n').filter(function (a) {return a;})
									};
								});
							});
						};
					}
				]
			)
			.directive('behanceIntro',
				[
					'behanceIntro_link',
					function (link) {
						return {
							restrict: 'AE',
							scope: {},
							replace: true,
							templateUrl: 'api/behance/template/intro.html',
							link : link
						};
					}
				]
			);
	}
)(behance);
