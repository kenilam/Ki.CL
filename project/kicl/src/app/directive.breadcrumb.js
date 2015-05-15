(
	function init (app) {
		'use strict';

		app
			.service('breadcrumb_stateChange',
				[
					'$rootScope', '$timeout', 'config',
					function whenStateChange (root, timeout, config) {
						var idx = 0,
							route = _.rest(config.route.map.split('/:'));

						function shouldReject (obj) {
							return obj.name === config.route.index;
						}

						function eachList (name) {
							idx ++;

							return {
								name : name,
								route : route.slice(0, idx).join('.') + '({' + route[idx - 1] + ':"' + name + '"' + '})'
							};
						}

						function whileStateChange (scope, elm) {
							return function (event, toState, toParams) {
								scope.breadcrumb.list = [];

								timeout.cancel(scope.breadcrumb.timer.whileStateChange);
								scope.breadcrumb.timer.whileStateChange = timeout(function () {
									scope.breadcrumb.list = _.reject(_.map(toParams, eachList), shouldReject);

									scope.breadcrumb.state = _.toArray(toParams).join('.');
								}, 0);

								idx = 0;
							};
						}

						function trigger (scope, elm) {
							root.$on('$stateChangeSuccess', whileStateChange(scope, elm));
						}

						return trigger;
					}
				]
			)
			.service('breadcrumb_link',
				[
					'$rootScope', 'config', 'resize', 'breadcrumb_stateChange',
					function link (root, config, resize, stateChange) {
						function trigger (scope, elm) {
							var idx = 0,
								route = _.rest(config.route.map.split('/:'));

							scope.breadcrumb = {
								timer : {},
								root : {
									name : config.route.index,
									route : route[idx] + '({' + route[idx] + ':"' + config.route.index + '"})'
								},
								resize : resize('breadcrumb', scope, elm)
							};

							stateChange(scope, elm);
						}

						return trigger;
					}
				]
			)
			.directive('breadcrumb',
				[
					'breadcrumb_link',
					function directive (link) {
						return {
							restrict: 'AE',
							replace: true,
							scope : {
								'isolate' : '&'
							},
							templateUrl: 'partial/breadcrumb.html',
							link: link
						};
					}
				]
			);
	}
)(kicl);
