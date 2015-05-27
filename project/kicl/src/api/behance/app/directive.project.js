(
	function (app) {
		'use strict';

		app
			.service('behanceProject_link',
				[
					'$rootScope', '$state', '$stateParams', '$timeout',
					function (root, state, stateParams, timeout) {
						return function (scope) {
							var key = _.keys(stateParams),
								route = _.last(key),
								projectId,
								apiResource,
								control = {
									close : function () {
										var prevState = key[key.length - 2],
											params = {};

										params[prevState] = stateParams[prevState];

										state.go(prevState, params);
									}
								},
								fakeScroll = function () {
									
								},
								setProject = function () {
									projectId = stateParams[route];

									if (projectId) {
										apiResource = root.api.behance.resource.project[projectId];
									}

									fakeScroll();

									root.api.behance.resource.$promise.then(function (resource) {
										scope.resource = resource.widget.project;
										scope.resource.userName = resource.userName;

										if (apiResource) {
											scope.project = apiResource.project;

											fakeScroll();

											return;
										}

										apiResource = root.api.behance.resource.project[projectId] = root.api.behance.project();

										apiResource.$promise.then(function (data) {
											data.project.published_on = moment(new Date(data.project.published_on * 1000));

											scope.project = data.project;
											scope.project.control = control;

											fakeScroll();
										});
									});
								};

							if (!root.api.behance.resource.project) {
								root.api.behance.resource.project = {};
							}

							scope.project = {
								loading : true
							};

							scope.$on('$stateChangeSuccess', setProject);

							setProject();
						};
					}
				]
			)
			.directive('behanceProject',
				[
					'behanceProject_link',
					function (link) {
						return {
							restrict: 'AE',
							replace: true,
							templateUrl: 'api/behance/template/project.html',
							link: link
						};
					}
				]
			);
	}
)(behance);
