(function about () {
	'use strict';

	var ref = {},
		state = {
			name: 'about',
			url: '/about',
			resolve : {
				resource: ['async', 'viewAboutResource', function resource (async, viewAboutResource) {
					if (!ref.resource) {
						ref.resource = async({ url : viewAboutResource }).get().$promise;
					}

					return ref.resource;
				}]
			},
			views: {
				'section' : {
					templateUrl: 'app/view/about/about.html',
					controller: 'view.about.controller'
				}
			}
		},
		constant = {
			resource : 'app/view/about/about.json'
		},
		controller = [
			'$rootScope',
			'$scope',
			'$timeout',
			'$element',
			'resource',
			'sitemap',
			'statechange',
			'tween',
			function controller (root, scope, timeout, element, resource, sitemap, statechange, tween) {
				function behanceUserData (event, data) {
					scope.$broadcast('behance.user.throbber.hide');
				}

				function onEnter (toState, fromState) {
					tween.set(element, { opacity : 0 });
					tween.to(element, 1, { opacity : 1, delay : fromState.name ? 1.5 : 0.5 });
				}

				function init () {
					root.$broadcast('globalHeader.show');
				}

				function destroy () {
					tween.set(element, { opacity : 1 });
					tween.to(element, 1, { opacity : 0 });
				}

				scope.name = resource.name;
				scope.timer = {};
				scope.content = resource.content;

				timeout.cancel(scope.timer.init);
				scope.timer.init = timeout(init, 0);

				scope.$on('behance.user.data', behanceUserData);
				
				sitemap.current('about', 'root');

				statechange(scope, { name : 'about' }).when({ onEnter : onEnter, onExit : destroy });
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
				sitemap.add('about', {name: 'about', route: 'about()'});
			}
		];

	angular
		.module('view.about', [])
		.constant('viewAboutResource', constant.resource)
		.config(config)
		.run(run)
		.controller('view.about.controller', controller);
}());
